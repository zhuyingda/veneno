"use strict";

const through = require('through2');
const request = require('request');
const fs = require('fs');
const path = require('path');
const output = require('../lib/out');

let leaks = [];
let WatchList = [];
let ApiList = [];
let tokenPrefix = 'tokenMadeByVenenoWebPenetration';
let Dict = [];

function httpGet(url, params, jar) {
    return new Promise((resolve, reject)=> {
        output.log(url);
        request
            .get(url, {
                qs: params,
                //如果想用charles/fiddler之类的监听数据包
                proxy: 'http://localhost:8089',
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36'
                },
                jar: jar
            })
            .on('error', function (err) {
                console.log(err);
                reject(err)
            })
            .pipe(through.obj({objectMode: true, allowHalfOpen: false}, (file, enc, cb)=> {
                let response = file.toString();
                output.log("测试路径: " + url + "参数: " + params + "\n");
                resolve(response);
                cb();
            }))
    })
}

function penetrationWatch(originUrl, para, token) {
    for (let i of WatchList) {
        request(i.url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                if (body.includes(token)) {
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
                output.err('持久型xss:' + originUrl + '参数:' + para + '<=>' + watchUrl + '向量:' + vector);
            }
        }
    })
}

function testApi() {
    for (let i of ApiList) {
        for (let j of i.params) {
            let o = {};
            o[j] = tokenPrefix + new Date().getTime();
            httpGet(i.url, o).then((res)=> {
                output.log('向接口' + i.url + '发起http请求成功');
                penetrationWatch(i.url, j, o[j]);
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

function selfXss(opt) {
    let dict = fs.readFileSync(path.resolve(__dirname, 'dictionary')).toString();
    dict = dict.split('\n');

    if (opt.log) {
        process.env.LOG = opt.log;
    } else {
        process.env.LOG = 'none'
    }

    //命令行进度条
    let count = 0;
    let hasFound = false;
    let length = dict.length * opt.params.length;

    //根据参数设置cookie
    let j = request.jar();
    let cookie = request.cookie(opt.cookie);
    j.setCookie(cookie, opt.url);


    for (let param of opt.params) {
        for (let i of dict) {
            let obj = {};
            obj[param] = i;

            httpGet(opt.url, obj, j)
                .then(function (data) {
                    count++;
                    progressBar(count / length);
                    if (count / length === 1) {
                        console.log("\n扫描完毕");
                        if (!hasFound) {
                            console.log("未发现任何漏洞");
                        }
                        process.exit();
                    }
                    if (data.includes(i)) {
                        hasFound = true;
                        output.err("反射型xss：" + i);
                    }
                })
        }
    }
}

function progressBar(percent) {
    if (process.env.LOG === "none") {
        process.stdout.write('\r----' + Math.floor(percent * 100) + "%----");
    }
}

module.exports = {
    durable: main,
    selfXss: selfXss
}