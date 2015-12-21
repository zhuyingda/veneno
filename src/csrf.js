"use strict";

const request = require('request');
const output = require('../lib/out');
const https = require('https');

function httpGet(url) {
    return new Promise((resolve, reject) => {
        request({url: url}, (error, response, body) => {
            if (error == null) {
                resolve(body);
            } else {
                output.err(error);
                reject(error);
            }
        })
    })
}

module.exports = {
    httpGet: httpGet
}