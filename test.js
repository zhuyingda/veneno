"use strict";
//var spawn = require('child_process').spawn,
//    spider = spawn('node',['src/spider.js', '--host', 'www.zhuyingda.com']);
//
//console.time('spider time:');
//
//spider.stdout.on('data', function (data) {
//    console.log('stdout: ' + data);
//});
//
//spider.stderr.on('data', function (data) {
//    console.log('stderr: ' + data);
//});
//
//spider.on('close', function (code) {
//    console.log('child process exited with code ' + code);
//    console.timeEnd('spider time:');
//});
var spider = require('./src/spider');

spider('www.imququ.com');