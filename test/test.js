"use strict";
var request = require('request');

request({
    url: "https://ac.cnstrc.com/autocomplete/t?callback=jQuery22009023601040244102_1455951975289&autocomplete_key=CD06z4gVeqSXRiDL2ZNK&query=t&_=1455951975290",
    "headers": {
        "user-agent":"avc",
        "referrer" : "this is my csrf"
    }
}, (error, response, body) => {
    if (error == null) {
        console.log(body);
    } else {
        console.log(error);
    }
})