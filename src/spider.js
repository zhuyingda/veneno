"use strict";
var fs = require('fs');
var through = require('through2');
var request = require('request');
var hostPrefix = '';
var urlStack = [];
var jsCount=0;
var jsStack = [];

function httpGet(url, ii) {
    //console.log('发起请求:', url);
    request
        .get(url)
        .on('response', function (response) {
            //console.log(response.statusCode);
            //console.log(response.headers['content-type']);
        })
        .on('error', function (err) {
            console.log('出错url:', url);
            console.log(err);
            console.log('出错时扫到的:', ii);
        })
        .pipe(filter())
}

function filter() {
    return through.obj(function (file, enc, cb) {
        //console.log('result:', file.toString());
        let htmlContent = file.toString();
        detectPath(htmlContent);
        detectJs(htmlContent);
    })
}

function detectPath(str) {
    let reg = /<a\b("[^"]*"|'[^']*'|[^'">])*>/g;
    str.replace(reg, function (i) {

        let reg2 = /href=["'].*?["']/g;
        i.replace(reg2, function (ii) {
            let url = ii.slice(6, ii.length - 1);
            //console.log('发现路径:', url);
            if (/^http/.test(url)|| /^git/.test(url)) {
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
            var src = ii.slice(5, ii.length-1);
            for (let j = 0; j < jsStack.length; j++) {
                if (jsStack[j] == src) {
                    //console.log('忽略已扫src:', url);
                    return;
                }
            }
            jsStack.push(src);
            jsCount++;
            console.log('发现js:', src);
        })
    });
}

function detectAjax(str) {

}

process.on('exit', function (code) {
    console.timeEnd('spider process');
    console.log('About to exit with code:', code);
    console.log('共发现js地址:'+ jsCount +'个');
});

function main(host) {
    console.time('spider process');
    let url = 'http://' + host;
    hostPrefix = url;
    httpGet(url);
}

module.exports = main