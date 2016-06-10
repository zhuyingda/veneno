/**
 * @file phantom_script
 * @desc PhantomJs子进程执行的脚本
 * @author zhuyingda
 */

var page = require('webpage').create();
var system = require('system');

// 将ohantom伪装成一个chrome浏览器
page.settings.userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36';

// 去除phantom client的特征，绕过防御性嗅探
page.onInitialized = function () {
    page.evaluate(function () {
        ['_phantom', '_phantomas', 'callPhantom', 'Buffer', 'couchjs', 'spawn',
            'webdriver'
        ].forEach(function (key) {
            delete window[key];
        });
        delete window.callPhantom;
    });
};

page.onResourceRequested = function (requestData, networkRequest) {
    if(/jpg$/.test(requestData.url) || /png$/.test(requestData.url)){
        return;
    }
    console.log('Request (#' + requestData.id + '): ' + JSON.stringify(requestData));
    // console.log('network (#' + requestData.id + '): ' + JSON.stringify(networkRequest));
};

console.log(111);
console.log(system.args)
phantom.exit();

// page.open('http://xiao.youxi.com', function (status) {
//
//     // var content = page.plainText;
//     // console.log('Content: ' + content);
//     phantom.exit();
// });
