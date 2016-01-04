"use strict";
var xss = require('../src/xss');

var host = '192.168.0.100:3000';

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