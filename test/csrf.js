"use strict";
const csrf = require('../src/csrf');
const word = require('../lib/word_corpus');
const loki = require('lokijs');

let name = 'a';
let db = new loki('names.json');
let names = db.addCollection('untapped_names');

function save(val) {
    names.insert( { name : val} );
    db.saveDatabase();
}

function testName(name) {
    console.log('发起请求：',name);
    csrf.httpGet('http://www.npmjs.com/search?q=' + name).then(function (data) {
        if (/Sorry,\s*no\s*results\s*for/.test(data)) {
            console.log(name, '可用');
            save(name);
        }
    });
}

function run() {
    if(name != 'z'){
        console.log(name);
        testName(name);
        name = word.nextWord(name);
        process.nextTick(run);
    }
}

run();