/**
 * @desc 解析uri为xss模块需要的格式
 */
'use strict';

module.exports = parser;

function parser(uri) {
    let uriSecs = uri.match(/(^http(s|):\/\/[\w|\W]+)\?([\w|\W]+)/);
    let ret = {
        isHttps: false,
        hasParam: true
    };
    if (uriSecs === null) {
        return {
            hasParam: false
        };
    }
    if (uriSecs[2] === 's') {
        ret.isHttps = true;
    }
    ret.apiName = uriSecs[1];
    ret.apiParams = [];
    let params = uriSecs[3].split('&');
    for (let i in params) {
        let param = params[i].match(/(^[\w|\W]+)=[\w|\W]*$/)[1];
        ret.apiParams.push(param);
    }
    return ret;
}
