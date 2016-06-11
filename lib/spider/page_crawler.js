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
// 资源加载超时阀值设定
page.settings.resourceTimeout = 10000;

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
    // if (/\.jpg$/.test(requestData.url) || /\.png$/.test(requestData.url) || /\.css$/.test(requestData.url) || /\.js$/.test(requestData.url)) {
    //     return;
    // }
    console.log(JSON.stringify(requestData) + '__BUFFER_TAG__');
};
page.onResourceTimeout = function(request) {
    // console.log('Response (#' + request.id + '): ' + JSON.stringify(request));
    console.log('__ERROR_TIMEOUT__');
};

// 获取资源
page.open(uri, function (status) {
    if (status == "success") {
        var content = page.content;
        console.log('__PAGE_CONTENT__' + content + '__PAGE_CONTENT__');
        phantom.exit();
    }
});
