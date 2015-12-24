"use strict";
const csrf = require('../src/csrf');
const word = require('../lib/word_corpus');
const loki = require('lokijs');
const https = require('https');
const fs = require('fs');

let name = 'a';
let db = new loki('names.json');
let names = db.addCollection('untapped_names');

function save(val) {
    names.insert({name: val});
    db.saveDatabase();
}

function testName(name) {
    let options = {
        hostname: 'www.npmjs.com',
        port: 443,
        path: '/search?q=' + name,
        method: 'GET'
    };

    let reg = new RegExp('"\/package\/' + name + '"');
    let req = https.request(options, function (res) {
        let data = '';
        res.on('data', function (d) {
            data += d;

        });
        res.on('end', function () {
            //console.log(reg.test(data.toString()));
            if (!reg.test(data.toString())) {
                console.log(name, '可用');
                save(name);
            }
        })
    });
    req.end();

    req.on('error', function (e) {
        console.error(e);
    });
}

let words = fs.readFileSync('../lib/google-10000-english-usa.txt', 'utf8').split('\n');
let i = 0;

let t = setInterval(function () {
    if (i < words.length) {
        testName(words[i]);
        i++;
    } else {
        clearInterval(t);
    }
}, 30);