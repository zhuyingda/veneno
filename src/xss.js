"use strict";

var through = require('through2');
var request = require('request');
var fs = require('fs');

var data;

function loadDict() {
    return new Promise((resolve, reject) => {
        fs.createReadStream(__dirname + '/dict.json')
            .pipe(through(function (chunk, enc, callback) {
                let reg1 = /\\"/g;
                let reg2 = /transform\\/g;
                data = chunk.toString();
                //data = data.replace(/\\"/g,'\"');
                //console.log(data);
                data = JSON.parse(data);
                //console.log(data);
                let temp = [];
                data.dict.forEach(function (i) {
                    i = i.replace(reg1, '"');
                    i = i.replace(reg2, '\\');
                    temp.push(i);
                });
                data = temp;
                resolve();
                callback()
            }));
    })
}

function inject() {
    console.log(data);
}

function main() {
    loadDict()
        .then(()=> {
            console.log(data);
        })
}

module.exports = main