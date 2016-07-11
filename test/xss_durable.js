"use strict";
var xss = require('../src/xss').durable;
var fs = require('fs');
var path = require('path');

var testIp = fs.readFileSync(path.resolve(__dirname, "../") + "/.venenoconf").toString();
var host = testIp + ':3000';

var apiList = [
    {
        url: 'http://' + host + '/add_comment',
        params: [
            'content'
        ]
    },
    {
        url: 'http:// ' + host + ' /get_comment',
        params: []
    }
];
var watchList = [
    //{
    //    url: 'http://' + host + '/get_comment'
    //},
    {
        url: 'http://' + host
    }
];

/**
 * @param apiList: 入口api列表，预设的xss向量将会在这些接口被传入
 * @param watchList: 监测api列表，在每次输入xss向量之后会在这些接口检查是否有向量返回且返回的向量是否完整
 * @param log: 日志统计方式，none为不记录，print为打印出来
 */
xss({
    apiList: apiList,
    watchList: watchList,
    cookie: "key=10010; key2=2012; key3=xxxxx",
    log: 'none'
});