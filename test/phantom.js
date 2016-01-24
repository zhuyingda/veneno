var page = require('webpage').create();
//page.open('http://www.zhuyingda.com', function(status) {
//    console.log("Status: " + status);
//    if(status === "success") {
//        page.render('example.png');
//    }
//    phantom.exit();
//});
page.onResourceRequested = function(request) {
    if(!/[png|jpg|js|css]$/.test(request.url)){
        console.log('Request ' + request.url);
    }
};
page.onResourceReceived = function(response) {
    //console.log('Receive ' + JSON.stringify(response, undefined, 4));
};

page.onResourceError = function(resourceError) {
    console.log('ERROR: Unable to load resource (#' + resourceError.id + 'URL:' + resourceError.url + ')');
    console.log('ERROR: code ' + resourceError.errorCode + '. Description: ' + resourceError.errorString);
};
page.open('http://xiao.youxi.com/');