var Horseman = require('node-horseman');
var horseman = new Horseman();

horseman
    .userAgent("Mozilla/5.2 (Windows NT 6.1; WOW64; rv:27.0) Gecko/20100101 Firefox/27.0 this is the fucking attack")
    .on('resourceRequested', function (requestData, networkRequest) {
        //console.log('data:',requestData);
        if (!/[png|jpg|js|css]$/.test(requestData.url)) {
            console.log(requestData.url);
        }
    })
    .open('http://xiao.youxi.com')
    .on("loadFinished", function (status) {
        console.log("status:",status);
        horseman.close();
    })