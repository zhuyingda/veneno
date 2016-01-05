"use strict";
const spider = require('../src/spider');
/**
 * @param host: 目标网站域名
 * @param crossSite: 爬虫是否跨站
 * @param log: 日志统计方式，none为不记录，log为打印出来
 */
spider({
    host: 'localhost:3000',
    crossSite: false,
    log: 'none',
    headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36'
    }
});