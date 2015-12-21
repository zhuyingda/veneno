"use strict";
const csrf = require('../src/csrf');
const word = require('../lib/word_corpus');
const loki = require('lokijs');
const https = require('https');

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

function run() {
    if (name != 'zzz') {
        console.log(name);
        testName(name);
        name = word.nextWord(name);
        process.nextTick(run);
    }
}

<<<<<<< HEAD
run();
=======
run();
>>>>>>> 79e45eab160ff84fdd1e7c4ce345f2a57cb61917
