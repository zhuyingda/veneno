"use strict";
const spider = require('../src/spider');
/**
 * @param host: 目标网站域名
 * @param crossSite: 爬虫是否跨站
 * @param log: 日志统计方式，none为不记录，log为打印出来
 */
spider({host: 'xiao.youxi.com', crossSite: false, log: 'none'});