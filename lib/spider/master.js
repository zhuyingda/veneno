/**
 * @file master
 * @desc 爬虫的主进程
 * @author zhuyingda
 */

var Q = require('q');
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
        var deferred = Q.defer();
        var tmpStr = "";
        this.inst = spawn(this.binPath, [this.runPath, this.uri]);
        this.bindEvt();
        this.inst.stdout.on('data', function (data) {
            tmpStr += data.toString();
        });

        this.inst.on('exit', function (code) {
            if(code == 0){
                if(/__ERROR_TIMEOUT__/.test(tmpStr)){
                    deferred.reject("network timeout");
                }
                var arr = tmpStr.split('__BUFFER_TAG__\n');

                var networkList = 'get network failed';
                if(arr.slice(0,arr.length-1).length){
                    networkList = arr.slice(0,arr.length-1);
                    networkList.forEach(function(i,key){
                        networkList[key] = JSON.parse(i);
                    });
                }
                var pageContent = arr[arr.length-1].split('__PAGE_CONTENT__')[1] || 'get content failed';

                var data = {
                    content: pageContent,
                    networks: networkList
                }
                deferred.resolve(data);
            }else{
                deferred.reject(code);
            }
        }.bind(this));
        return deferred.promise;
    }.bind(this);
}
PageCrawler.prototype = new Crawler();

var pc = new PageCrawler('http://xiao.youxi.com');
pc.run().then(function(data){
    console.log("promise resolve with: ", data.networks[2]);
}).fail(function(err){
    console.error("promise reject with: ",err);
});
