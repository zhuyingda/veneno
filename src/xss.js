"use strict";

const through = require('through2');
const request = require('request');
const fs = require('fs');
const output = require('../lib/out');

let leaks = [];
let WatchList = [];
let ApiList = [];
let testTokenReg = /tokenMadeByVenenoWebPenetration/;
let testTokenStr = 'tokenMadeByVenenoWebPenetration';
let Dict = [];

function httpGet(url, params) {
    return new Promise((resolve, reject)=> {
        output.log(url);
        request
            .get(url, {qs: params})
            .on('error', function (err) {
                console.log(err);
                reject(err)
            })
            .pipe(through.obj({objectMode: true, allowHalfOpen: false}, (file, enc, cb)=> {
                let response = file.toString();
                output.log(response);
                resolve(response);
                cb();
            }))
    })
}

function penetrationWatch(originUrl, para) {
    for (let i of WatchList) {
        request(i.url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                if (testTokenReg.test(body)) {
                    output.print('发现疑似xss点:' + originUrl + '参数:' + para + '<=>' + i.url);
                    crush(originUrl, para, i.url);
                }
            }
        })
    }
}

function xssCheck(originUrl, para, vector, watchUrl) {
    request(watchUrl, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            if (body.indexOf(vector) != -1) {
                output.err('发现xss点:' + originUrl + '参数:' + para + '<=>' + watchUrl + '向量:' + vector);
            }
        }
    })
}

function testApi() {
    for (let i of ApiList) {
        for (let j of i.params) {
            let o = {};
            o[j] = testTokenStr;
            httpGet(i.url, o).then((res)=> {
                output.log('向接口' + i.url + '发起http请求成功');
                penetrationWatch(i.url, j);
            })
        }
    }
}

function crush(url, para, watchUrl) {
    for (let vector of Dict) {
        let o = {};
        o[para] = vector;
        httpGet(url, o).then((res)=> {
            output.log('向接口' + url + '发起http请求成功');
            xssCheck(url, para, vector, watchUrl);
        })
    }
}

function main(opt) {
    if (opt.log) {
        process.env.LOG = opt.log;
    } else {
        process.env.LOG = 'none'
    }
    WatchList = opt.watchList;
    ApiList = opt.apiList;
    let dict = fs.readFileSync(__dirname + '/dictionary').toString();
    Dict = dict.split('\n');
    testApi();
}

module.exports = main