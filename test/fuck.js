"use strict";
var xss = require('../src/xss').durable;

var apiList = [
    {
        url: 'http://h5.ffan.com/app/goods/detail',
        params: [
            'flashsale',
            'id',
            'adId',
            'cityId',
            'plazaId',
            'app_type',
            'app_version',
            'app_version',
            'app_bundleid',
            'ddId',
            'wdId',
            'longitude',
            'latitude',
            'FFUDID',
            'CITY_ID',
            'SHARE_STRING_ADID',
            'SESSIONID'
        ]
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