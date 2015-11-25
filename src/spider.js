"use strict";
var fs = require('fs');
var through = require('through2');
var request = require('request');
var host = '';
var urlStack = [];

function httpGet(url) {
    request
        .get(url)
        .on('response', function (response) {
            //console.log(response.statusCode);
            //console.log(response.headers['content-type']);
        })
        .on('error', function (err) {
            //console.log('出错url:', url);
            //console.log(err)
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
    let reg = /href\=[\'|\"].*[\'|\"]/g;
    str.replace(reg, function (i) {
        let url = i.slice(6, i.length - 1);
        console.log('发现路径:', url);
        for (let j = 0; j < urlStack.length; j++) {
            if (urlStack[j] == url) {
                return;
            }
        }
        urlStack.push(url);
        httpGet(host + url);
    });
}

function detectJs(str) {
    let reg = /src\=[\"|\'].*\.js[\"|\']/g;
    str.replace(reg, function (i) {
        console.log('发现js:', i.slice(5, i.length - 1));
        console.timeEnd('spider');
        console.log('发现js链接' + urlStack.length + '个');
    });
}

function detectAjax(str) {

}

module.exports = function (url) {
    host = url;
    httpGet(url);
}