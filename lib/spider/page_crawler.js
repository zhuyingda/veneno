/**
 * @file page_crawler
 * @desc PhantomJs子进程-用于抓取页面
 * @author zhuyingda
 */

var page = require('webpage').create();
var system = require('system');

// 第一个参数 当前爬虫所抓取的资源uri
var uri = system.args[1];

// 将ohantom伪装成一个chrome浏览器
page.settings.userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36';

// 去除phantom client的特征，绕过防御性嗅探
page.onInitialized = function () {
    page.evaluate(function () {
        [
            '_phantom',
            '_phantomas',
            'callPhantom',
            'Buffer',
            'couchjs',
            'spawn',
            'webdriver'
        ].forEach(function (key) {
            delete window[key];
        });
        delete window.callPhantom;
    });
};

// 监听网络请求
page.onResourceRequested = function (requestData, networkRequest) {
    if (/\.jpg$/.test(requestData.url) || /\.png$/.test(requestData.url) || /\.css$/.test(requestData.url) || /\.js$/.test(requestData.url)) {
        return;
    }
    console.log('Request (#' + requestData.id + '): ' + JSON.stringify(requestData));
    // console.log('network (#' + requestData.id + '): ' + JSON.stringify(networkRequest));
};

// 获取资源
page.open(uri, function (status) {

    // var content = page.plainText;
    // console.log('Content: ' + content);
    console.log("exit!!!");
    phantom.exit();
});
