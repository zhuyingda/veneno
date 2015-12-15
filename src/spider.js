"use strict";
let request = require('request');

let hostPrefix = '';
let urlStack = [];
let jsStack = [];
let xhrStack = [];

function httpGet(url) {
    request({url: url}, function (error, response, body) {
        if (error == null) {
            let htmlContent = body;
            detectPath(htmlContent);
            detectJs(htmlContent);
        } else {
            console.log(error);
        }
    })
}

function httpGetJs(src) {
    request({url: src}, function (error, response, body) {
        if (error == null) {
            detectXhr(src, body);
        } else {
            console.log(error);
        }
    })
}

function detectPath(str) {
    let reg = /<a\b("[^"]*"|'[^']*'|[^'">])*>/g;
    str.replace(reg, function (i) {
        let reg2 = /href=["'].*?["']/g;
        i.replace(reg2, function (ii) {
            let url = ii.slice(6, ii.length - 1);
            //console.log('发现路径:', url);
            if (/^git/.test(url) || /^javascript/.test(url)) {
                //console.log('忽略外站url:', url);
                return;
            }
            if(/^http/.test(url) ){
                console.log('发现外站url:', url);
                httpGet(url);
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
            let src = ii.slice(5, ii.length - 1);
            for (let j = 0; j < jsStack.length; j++) {
                if (jsStack[j] == src) {
                    //console.log('忽略已扫src:', src);
                    return;
                }
            }

            if (/^http/.test(src)) {
                //console.log('发现外站js:', src);
                httpGetJs(src);
                jsStack.push(src);
            } else {
                //console.log('发现站内js:', src);
                httpGetJs(hostPrefix + src);
                jsStack.push(hostPrefix + src);
            }
        })
    });
}

function detectXhr(src, body) {
    let jsContent = body;
    //发现jquery类库js
    if (/define\.amd\.jQuery/.test(jsContent)) {
        return;
    }
    let reg = /["']\/\w*['"]/g;
    jsContent.replace(reg, function (token) {
        let xhr = token.slice(1, token.length - 1);
        if (xhr == '\/') {
            //console.log('忽略无意义的"/":', token);
            return;
        }
        for (let j = 0; j < xhrStack.length; j++) {
            if (xhr == xhrStack[j]) {
                //console.log('忽略已扫xhr:', token);
                return;
            }
        }
        console.log('从', src, '发现疑似ajax接口:', xhr);
        xhrStack.push(xhr);
    });

}

process.on('exit', function (code) {
    if (code == 0) {
        console.timeEnd('共消耗时间');
        console.log('共发现xhr地址:' + xhrStack.length + '个');
    } else {
        console.log()
    }
});

function main(host) {
    console.time('共消耗时间');
    let url = 'http://' + host;
    hostPrefix = url;
    httpGet(url);
}

module.exports = main