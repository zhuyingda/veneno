"use strict";
var fs = require('fs');
var through = require('through2');
var request = require('request');

var hostPrefix = '';
var urlStack = [];
var jsCount = 0;
var jsStack = [];
var xhrCount = 0;

function httpGet(url, errStr) {
    //console.log('发起请求:', url);
    request
        .get(url)
        .on('error', function (err) {
            //console.log('出错url:', url);
            //console.log(err);
            //console.log('出错时扫到的:', errStr);
        })
        .pipe(filter())
}

function httpGetJs(src){
    request.get(src).pipe(detectXhr());
}

function filter() {
    return through.obj({ objectMode: true, allowHalfOpen: false },function (file, enc, cb) {
        let htmlContent = file.toString();
        detectPath(htmlContent);
        detectJs(htmlContent);
        cb();
    })
}

function detectPath(str) {
    let reg = /<a\b("[^"]*"|'[^']*'|[^'">])*>/g;
    str.replace(reg, function (i) {
        let reg2 = /href=["'].*?["']/g;
        i.replace(reg2, function (ii) {
            let url = ii.slice(6, ii.length - 1);
            //console.log('发现路径:', url);
            if (/^http/.test(url) || /^git/.test(url) || /^javascript/.test(url)) {
                //console.log('忽略外站url:', url);
                return;
            }
            for (let j = 0; j < urlStack.length; j++) {
                if (urlStack[j] == url) {
                    //console.log('忽略已扫url:', url);
                    return;
                }
            }
            urlStack.push(url);
            httpGet(hostPrefix + url, ii);
        })
    });
}

function detectJs(str) {
    let reg = /<script\b("[^"]*"|'[^']*'|[^'">])*>/g;
    str.replace(reg, function (i) {
        let reg2 = /src=["'].*?["']/g;
        i.replace(reg2, function (ii) {
            var src = ii.slice(5, ii.length - 1);
            for (let j = 0; j < jsStack.length; j++) {
                if (/^http/.test(src)) {
                    //console.log('发现外站js:', url);
                    httpGetJs(src);
                    return;
                }
                if (jsStack[j] == src) {
                    //console.log('忽略已扫src:', url);
                    return;
                }
            }
            jsStack.push(src);
            jsCount++;
            console.log('发现js:', src);
            httpGetJs(hostPrefix + src);
        })
    });
}

function detectXhr(){
    return through.obj({ objectMode: true, allowHalfOpen: false },function (file, enc, cb) {
        let jsContent = file.toString();
        let reg = /["']\/\w*['"]/g;
        jsContent.replace(reg, function (token) {
            console.log('发现疑似ajax接口:', token)
            xhrCount++;
        });
        cb();
    })
}

process.on('exit', function (code) {
    console.timeEnd('共消耗时间');
    //console.log('About to exit with code:', code);
    console.log('共发现xhr地址:' + xhrCount + '个');
});

function main(host) {
    console.time('共消耗时间');
    let url = 'http://' + host;
    hostPrefix = url;
    httpGet(url);
}

module.exports = main