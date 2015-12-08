"use strict";

var through = require('through2');
var request = require('request');
var fs = require('fs');

var leaks = [];
var watchList = [
    {
        url: 'http://127.0.0.1:3000/get_comment'
    },
    {
        url: 'http://127.0.0.1:3000'
    }
];
var apiList = [
    {
        url: 'http://127.0.0.1:3000/add_comment',
        params: [
            'content'
        ]
    },
    {
        url: 'http://127.0.0.1:3000/get_comment',
        params: [

        ]
    }
];
var testTokenReg = /tokenMadeByVenenoWebPenetration/;
var testTokenStr = 'tokenMadeByVenenoWebPenetration';

function loadDict() {
    console.log('读取字典...');
    return new Promise((resolve, reject) => {
        fs.createReadStream(__dirname + '/dict.json')
            .pipe(through(function (chunk, enc, callback) {
                let reg1 = /\\"/g;
                let reg2 = /transform\\/g;
                let data = chunk.toString();
                data = JSON.parse(data);
                let temp = [];
                data.dict.forEach(function (i) {
                    i = i.replace(reg1, '"');
                    i = i.replace(reg2, '\\');
                    temp.push(i);
                });
                console.log('字典读取完成');
                resolve(temp);
                callback()
            }));
    })
}

function httpGet(url, params) {
    return new Promise((resolve, reject)=> {
        //console.log(url);
        request
            .get(url, {qs: params})
            .on('error', function (err) {
                console.log(err);
                reject(err)
            })
            .pipe(through.obj({objectMode: true, allowHalfOpen: false}, (file, enc, cb)=> {
                let response = file.toString();
                //console.log(response);
                resolve(response);
                cb();
            }))
    })
}

function watch(originUrl, para) {
    for (let i of watchList) {
        request(i.url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                if (testTokenReg.test(body)) {
                    console.log('发现疑似xss点:', originUrl, '参数:', para, '<=>', i.url);
                }
            }
        })
    }
}

function testApi() {
    for (let i of apiList) {
        for (let j of i.params) {
            let o = {};
            o[j] = testTokenStr;
            httpGet(i.url, o).then((res)=> {
                //console.log('向接口', i.url, '发起http请求成功');
                watch(i.url, j);
            })
        }
    }
}

function main(opt) {
    loadDict()
        .then((dict)=> {
            testApi();
        })
}

module.exports = main