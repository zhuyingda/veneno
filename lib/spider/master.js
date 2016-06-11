/**
 * @file master
 * @desc 爬虫的主进程
 * @author zhuyingda
 */

var path = require('path');
var spawn = require('child_process').spawn;

// 爬虫基类
var Crawler = function () {
    this.binPath = path.join(__dirname, '..', 'phantomjs_mac', 'bin', 'phantomjs');
    this.inst = null;
}
Crawler.prototype.bindEvt = function () {
    if (this.inst) {
        this.inst.stderr.pipe(process.stderr);
        this.inst.on('error', function (err) {
            console.error('Error executing phantom at', binPath);
            console.error(err.stack);
        })

        this.inst.stdout.on('data', function (data) {
            console.log(data.toString());
        });

        process.on('SIGTERM', function () {
            this.inst.kill('SIGTERM')
            process.exit(1)
        }.bind(this))
    }
}

// 页面爬虫类
var PageCrawler = function (uri) {
    this.uri = uri;
    this.runPath = path.join(__dirname, 'page_crawler.js');
    this.run = function () {
        if (this.inst) {
            return;
        }
        this.inst = spawn(this.binPath, [this.runPath, this.uri]);
        this.bindEvt();
        this.inst.on('exit', function (code) {
            // Wait few ms for error to be printed.
            setTimeout(function () {
                process.exit(code)
            }, 20)
        });
    }.bind(this);
}
PageCrawler.prototype = new Crawler();

var pc = new PageCrawler('http://xiao.youxi.com');
pc.run();

// var binPath = path.join(__dirname, '..', 'phantomjs_mac', 'bin', 'phantomjs');
// var runPath = path.join(__dirname, 'page_crawler.js');
//
// var pageCrawler = spawn(binPath, [runPath, "http://xiao.youxi.com"]);
// pageCrawler.stderr.pipe(process.stderr);
//
// pageCrawler.stdout.on('data', function (data) {
//     console.log(data.toString());
// })
//
// pageCrawler.on('error', function (err) {
//     console.error('Error executing phantom at', binPath)
//     console.error(err.stack)
// })
//
// pageCrawler.on('exit', function (code) {
//     // Wait few ms for error to be printed.
//     setTimeout(function () {
//         process.exit(code)
//     }, 20)
// });
//
// process.on('SIGTERM', function () {
//     pageCrawler.kill('SIGTERM')
//     process.exit(1)
// })
