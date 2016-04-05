(function ($) {
    var winH;
    var lock = false;
    var pos = 1;

    reset();
    $(window).resize(reset);
    function reset() {
        winH = $(window).height();
        $('.section').css({height: winH, backgroundSize: 'cover'});
        $('.inner-wrap').css({height: winH});
        $('.i-wrap').css({height: winH});
        $('.e-wrap').css({height: winH});
        $('.t-wrap').css({height: winH});
        $('.section2').css({top: winH});
        $('.section3').css({top: winH * 2});
        $('.section4').css({top: winH * 3});
        $('.container').css({top: '-' + (pos - 1) * winH + 'px'});
        $('.rect1').css({top: (winH / 4 - 98) + 'px'});
        $('.rect1-left').css({top: (winH / 4 - 109) + 'px'});
        $('.rect1-right').css({top: (winH / 4 - 109) + 'px'});
        $('.rect2').css({bottom: (winH / 4 - 98) + 'px'});
        $('.rect2-left').css({bottom: (winH / 4 - 109) + 'px'});
        $('.rect2-right').css({bottom: (winH / 4 - 109) + 'px'});
    }

    $('.rect1').click(function () {
        location.href = '/blog.html';
    });
    $('.rect2').click(function () {
        location.href = '/docs.html';
    });

    $('.t-wrap a').click(function () {
        alert('消息发送成功');
        $('#name').val('');
        $('#message').val('');
        $('#email').val('');
        $('#company').val('');
    });


    setTimeout(function () {
        $('.container').show();
        sec1In();
        sec2Out();
        sec3Out();
        sec4Out();
    }, 1000);

    function turnUp() {
        lock = true;
        var h = (pos - 1 + 1) * winH;
        $('.container').animate({top: '-' + h + 'px'}, 500, 'swing', function () {
            pos++;
            if (pos == 1) {
                sec1In();
                sec2Out();
                sec3Out();
                sec4Out();
            } else if (pos == 2) {
                sec1Out();
                sec2In();
                sec3Out();
                sec4Out();
            } else if (pos == 3) {
                sec1Out();
                sec2Out();
                sec3In();
                sec4Out();
            } else if (pos == 4) {
                sec1Out();
                sec2Out();
                sec3Out();
                sec4In();
            }
            $('.radio').eq(pos - 1).addClass('cur').siblings().removeClass('cur');
        });
        setTimeout(function () {
            lock = false;
        }, 2000);
    }

    function turnDown() {
        lock = true;
        var h = (pos - 1 - 1) * winH;
        $('.container').animate({top: '-' + h + 'px'}, 500, 'swing', function () {
            pos--;
            if (pos == 1) {
                sec1In();
                sec2Out();
                sec3Out();
                sec4Out();
            } else if (pos == 2) {
                sec1Out();
                sec2In();
                sec3Out();
                sec4Out();
            } else if (pos == 3) {
                sec1Out();
                sec2Out();
                sec3In();
                sec4Out();
            } else if (pos == 4) {
                sec1Out();
                sec2Out();
                sec3Out();
                sec4In();
            }
            $('.radio').eq(pos - 1).addClass('cur').siblings().removeClass('cur');
        });
        setTimeout(function () {
            lock = false;
        }, 2000);
    }

    var hammertime = new Hammer($('.container')[0], {});
    hammertime.get('pan').set({direction: Hammer.DIRECTION_ALL});
    hammertime.get('swipe').set({direction: Hammer.DIRECTION_VERTICAL});
    var swipeLock = false;

    hammertime.on('pan', function (evt) {
        $(".right-nav").removeClass("active");
        if (lock) {
            return;
        }
        var $container = $('.container');
        $container.css({top: (evt.deltaY - (pos - 1) * winH) + 'px'});
    });
    hammertime.on('panend', function (evt) {
        if (lock) {
            return;
        }
        if (swipeLock) {
            swipeLock = false;
            return;
        }
        console.log("panend");
        $('.container').animate({top: -(pos - 1) * winH + 'px'});
    });
    hammertime.on('swipe', function (evt) {
        $(".right-nav").removeClass("active");
        if (lock) {
            return;
        }
        console.log("swipe:", evt.deltaY);
        swipeLock = true;
        if (evt.deltaY < -100 && pos != 4) {
            turnUp();
        } else if (evt.deltaY > 100 && pos != 1) {
            turnDown();
        } else {
            $('.container').animate({top: -(pos - 1) * winH + 'px'});
        }
    });

    function sec1In() {
        setTimeout(function () {
            $('.title-zh').animate({opacity: 1, top: (winH / 2 - 145) + 'px'});
            $('.title-en').animate({opacity: 1, top: (winH / 2 - 106) + 'px'});
        }, 0);
    }

    function sec1Out() {
        $('.title-zh').css({opacity: 0, top: 100 + 'px'});
        $('.title-en').css({opacity: 0, top: 500 + 'px'});
    }

    function sec2In() {
        $('.rect1-right').transition({translate: [78, 0], scale: [1, 1], rotate: 180}, 600);
        $('.rect2-right').transition({translate: [78, 0], scale: [1, 1], rotate: 180}, 600);
        $('.rect1-left').transition({translate: [-78, 0], scale: [1, 1], rotate: -180}, 600);
        $('.rect2-left').transition({translate: [-78, 0], scale: [1, 1], rotate: -180}, 600);
    }

    function sec2Out() {
        $('.rect1-right').transition({translate: [0, 0], scale: [0.3, 0.3], rotate: 0}, 1);
        $('.rect2-right').transition({translate: [0, 0], scale: [0.3, 0.3], rotate: 0}, 1);
        $('.rect1-left').transition({translate: [0, 0], scale: [0.3, 0.3], rotate: 0}, 1);
        $('.rect2-left').transition({translate: [0, 0], scale: [0.3, 0.3], rotate: 0}, 1);
    }

    function sec3In() {
        $('.rect-right').transition({translate: [300, -160]}, 600);
        $('.rect-left').transition({translate: [-300, 160]}, 600);
        $('.rect-center-glass').transition({scale: [1, 1]}, 600);
    }

    function sec3Out() {
        $('.rect-right').transition({translate: [0, 0]}, 1);
        $('.rect-left').transition({translate: [0, 0]}, 1);
        $('.rect-center-glass').transition({scale: [0.9, 0.9]}, 1);
    }

    function sec4In() {

    }

    function sec4Out() {

    }


    $.map($('a'), function (i) {
        if ($(i).html() == '申请友链') {
            $(i).addClass('friend-link').hide();
        }
    });

    $(".right-nav")[0].addEventListener("touchstart", function () {
        if (!$(this).hasClass("active")) {
            $(this).addClass("active");
        }
    }, false);
    $(".container")[0].addEventListener("touchstart", function () {
        if ($(this).hasClass("active")) {
            $(".right-nav").removeClass("active");
        }
    }, false);
})($);