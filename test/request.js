'use strict';

var fs= require('fs');
var path = require('path');
var request = require('../lib/request');

var testIp = fs.readFileSync(path.resolve(__dirname, "../") + "/.venenoconf").toString();
var host = testIp + ':3000';

request({
    uri: 'http://' + host + '/test_get_method',
    query: {
        a: 1
    },
    method: 'GETs'
}).then(function (data) {
    console.log(data.resp);
},function (err) {
    console.error(err);
});