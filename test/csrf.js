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

    let req = https.request(options, function (res) {
        res.on('data', function (d) {
            if (/Sorry,\s*no\s*results\s*for/.test(d)) {
                console.log(name, '可用');
                save(name);
            }
        });
    });
    req.end();

    req.on('error', function (e) {
        console.error(e);
    });
}

function testNameByApi(name) {
    let options = {
        hostname: 'ac.cnstrc.com',
        port: 443,
        path: '/autocomplete/' + name,
        method: 'GET'
    };

    let req = https.request(options, function (res) {
        res.on('data', function (d) {
           console.log(d);
        });
    });
    req.end();

    req.on('error', function (e) {
        console.error(e);
    });
}

testName('jalor');

//let words = fs.readFileSync('../lib/google-10000-english-usa.txt', 'utf8').split('\n');
//for(let i of words){
//    testName(i);
//}

//setInterval(function () {
//    if (name != 'zzzzzz') {
//        console.log(name);
//        testName(name);
//        name = word.nextWord(name);
//    }
//}, 20);