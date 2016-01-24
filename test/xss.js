"use strict";
var xss = require('../src/xss');
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

xss({log: 'none', apiList: apiList, watchList: watchList});