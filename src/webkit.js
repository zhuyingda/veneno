var phantom = require('phantom');

phantom.create(function (ph) {
    ph.createPage(function (page) {
        //page.onResourceRequested = function(request) {
        //    console.log(request);
        //    if(!/[png|jpg|js|css]$/.test(request.url)){
        //        console.log('Request ' + request.url);
        //    }
        //};
        //page.onResourceReceived = function(response) {
        //    console.log(response);
        //};
        page.onResourceRequested(
            function(requestData, request) { request.abort(); },
            function(requestData) { console.log(requestData.url) }
        );
        page.open("http://www.google.com", function (status) {
            console.log("opened  ", status);
            page.evaluate(function () { return document.title; }, function (result) {
                console.log('Page title is ' + result);
                //ph.exit();
            });
        });
    });
});