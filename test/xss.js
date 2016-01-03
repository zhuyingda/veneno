"use strict";
var xss = require('../src/xss');

var apiList = [
    {
        url: 'http://127.0.0.1:3000/add_comment',
        params: [
            'content'
        ]
    },
    {
        url: 'http://127.0.0.1:3000/get_comment',
        params: []
    }
];
var watchList = [
    {
        url: 'http://127.0.0.1:3000/get_comment'
    },
    {
        url: 'http://127.0.0.1:3000'
    }
];

xss({log: 'none', apiList: apiList, watchList: watchList});