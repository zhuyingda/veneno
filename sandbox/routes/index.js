var express = require('express');
var router = express.Router();
var detector = require('detector');

var store = {
    comments: [
        {
            comment: '第一条评论要先写进去',
            time: 'Tue Dec 08 2015'
        }
    ]
};

/* GET home page. */
router.get('/', function (req, res, next) {
    //console.log(detector.parse(req.rawHeaders[11]));
    console.log(req.rawHeaders);
    res.render('index', {comments: store.comments});
}).get('/add_comment', function (req, res, next) {
    var d = new Date();
    store.comments.push({
        comment: req.query.content,
        time: d.toDateString() + ':' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()
    });
    res.end(JSON.stringify({errno: 0, errmsg: 'ok', comments: store.comments}));
}).get('/get_comment', function (req, res, next) {
    res.end(JSON.stringify({errno: 0, errmsg: 'ok', comments: store.comments}));
})

module.exports = router;
