/**
 * @desc 集成化xss扫描工具
 */
'use strict';
// 目前仅支持http协议的网站
// 挂上代理在网站上进行操作即可

const proxy = require('../src/proxy');
const storage = require('../src/storage');
const xss = require('../src/xss');
let len = 0;

proxy();

setInterval(function () {
    let list = storage.list();
    if (list.length === len) {
        return;
    }
    len = list.length;
    xss.durable({
        apiList: list,
        watchList: list,
        log: 'print'
    });
    for (let i in list) {
        xss.selfXss({
            url: list[i].url,
            params: list[i].params,
            log: "none"
        })
    }
}, 10000);