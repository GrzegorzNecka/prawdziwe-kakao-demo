'use strict';


let vh = window.innerHeight * 0.01;

document.documentElement.style.setProperty('--vh', `${vh}px`);

window.addEventListener('resize', () => {
    // We execute the same script as before
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
});


(function ($) {

    $(window).on("load", function () {
        $("main").fadeIn(250);
        $(".section-wrap").fadeIn(800);
    });

    
    $(document).ready(function () {

        /*-------------------
             COOKIE'S
        --------------------*/
        if ($(".page--front-page").length) {

            $(window).on("load", function () {
                $("body").cookieAlert();
            });
        }
        /*-------------------
             MAIN - OPACITY
        --------------------*/

 


        /*-------------------
                SCROLLBAR
        --------------------*/

        new SimpleBar($('.navbar-left__absolute')[0]);
        new SimpleBar($('.section-wrap')[0]);

        /*-------------------
                MENU
        --------------------*/
        var menuIcon = $(".navbar-mobile"),
            leftMenu = $(".navbar-left"),
            body = $("body");

        menuIcon.on("click", function (e) {
            e.preventDefault;
            e.stopPropagation();

            if (body.hasClass("body--active")) {

                body.removeClass("body--active");

                if ($(".page--prawdziwe-kakao").length || $(".page--blog").length) {
                    $(".section-nav").fadeIn(300);
                }

            } else {

                body.addClass("body--active");
                if ($(".page--prawdziwe-kakao").length || $(".page--blog ").length) {
                    $(".section-nav").fadeOut(300);
                }
            }

            body.on("click", function () {
                body.removeClass("body--active");

                if ($(".page--prawdziwe-kakao").length || $(".page--blog ").length) {
                    $(".section-nav").fadeIn(300);
                }
            });

            leftMenu.on("click", function (e) {
                e.stopPropagation();

            });
        });

        /*--------------------
             PULSE-ICON
        --------------------*/
        var visiblePulseIcon = null;

        if ($('.pulse-icon__container').length) {

            var pulseIcon = $('.pulse-icon__container');

            function visible() {
                setTimeout(function () {
                    pulseIcon.addClass('visible');
                    pulse();
                }, 2000);
            };

            visible();

            function pulse() {
                pulseIcon.addClass('pulse');
                pulseIcon.on('animationend', function () {
                    $(this).removeClass('pulse')
                })
                var pulseTimeout = setTimeout(pulse, 3000);

                pulseIcon.on("click", function (e) {
                    e.stopPropagation()
                    pulseIcon.addClass("hidden");
                    clearTimeout(pulseTimeout);
                });
            };

            visiblePulseIcon = function () {
                pulseIcon.removeClass("hidden");
                pulse();
            };
        };


        /*--------------------
          PAGE FRONT - TEXT SLIDER
        --------------------*/

        if ($(".section-top__wrap").length) {

            var secTop = $(".section-top__wrap"),
                secTopSlider = $(".section-top__slider"),
                timer;

            function textSlider() {
                var firstElem = $(".section-top__slider").eq(0);
                firstElem.appendTo(secTop);
            };

            function tick() {
                timer = window.setTimeout(textSlider, 8000);
                setTimeout(tick, 8000);
            };
            tick();
        };

        /*----------------
          PAGE'S - PRAWDZIWE KAKAO & BLOG - NAV-MENU
        --------------------*/

        if ($(".pulse-icon__container--list").length) {

            var btnStart = $(".pulse-icon__container--list"),
                list = $("ul.section-nav"),
                doc = $(document);

            btnStart.on("click", function () {
                list.addClass("section-nav__active");

                list.on("click", function (e) {

                    e.stopPropagation();
                    //if  prawdziwe-kako page is open
                    if ($(".section-wrap--tabs").length) {
                        setTimeout(function () {
                            list.removeClass("section-nav__active");
                            visiblePulseIcon();
                        }, 200);
                    }
                });

                doc.on("click", function () {
                    list.removeClass("section-nav__active");
                    visiblePulseIcon();

                });
            });
        };

        /*--------------------
        PRAWDZIWE KAKAO - TABS
         --------------------*/

        if ($(".section-wrap--tabs").length) {

            var tabsNav = $(".section-wrap--tabs"),
                tabsNavItems = tabsNav.find(".nav-button"),
                tabsItemsContent = $(".section-content_tab"),
                activeClass = "nav-button--active",
                body = $("body"),
                backgroundWrap = $(".prawdziwe-kakao--background"),
                backgrounds = backgroundWrap.find(".prawdziwe-kakao");

            tabsNavItems.first().addClass(activeClass);
            tabsItemsContent.not(":first").hide();

            function tabsActive(tabNavItem) {
                tabsNavItems.removeClass(activeClass);
                tabNavItem.addClass(activeClass);
            };

            function appendBackground(index) {

                var backgroundActive = backgrounds.eq(index);

                backgroundActive.prependTo(backgroundWrap).addClass("active-background").animate({
                    "opacity": 1
                }, 300, function () {
                    $(".prawdziwe-kakao").not(backgroundActive).removeClass("active-background").animate({
                        "opacity": 0
                    }, 100, function () {
                        tabsItemsContent.hide().eq(index).fadeIn(100);
                    });
                });
            };

            tabsNavItems.on("click", function () {

                var tabNavItem = $(this),
                    index = tabNavItem.index();
                if (tabNavItem.hasClass(activeClass)) return;
                tabsActive(tabNavItem);
                appendBackground(index);
            });
        };
        /*-------------------
              MOVIE
         --------------------*/
        if ($(".page--filmy").length) {

            var contentVideo = $(".video-src"),
                movies = contentVideo.find($(".video-player--filmy")),
                contentThumbnail = $(".section-content__items"),
                videoWrap = contentVideo.find($(".video-player-wrap"));

            let videoPlayer = document.querySelectorAll('.video-player--filmy');

            // -------------create gallery

            function createThumbnail() {
                var thumbnails = $("<div></div>", {
                    "class": "video-player-wrap--filmy section-content__item"
                }).appendTo(contentThumbnail);
                return thumbnails;
            }

            for (var i = 1; i <= movies.length; i++) {
                createThumbnail();
            }

            var thumbnail = contentThumbnail.find($(".video-player-wrap--filmy"));

            movies.each(function (i, e) {
                var movie = $(this),
                    poster = movie.attr("poster"),
                    title = movie.attr("title");
                thumbnail.eq(i).html("<h3>" + title + "</h3>");
                thumbnail.eq(i).css({
                    "background-image": "url('" + poster + "')"
                });
            });

            // -------------create  video elements

            function createOverlay(videoPlayerOpen) {
                var overlay = $(".page-overlay");
                if (!overlay.length)
                    overlay = $("<div></div>", {
                        "class": "page-overlay overlay"
                    }).appendTo($("main"));

                overlay.on("click", function () {
                    videoPlayerOpen.pause();
                    closeOverlay();
                    closeVideo();
                });

                return overlay;
            }

            function closeOverlay() {
                var overlay = $(".page-overlay");
                overlay.fadeOut(300, function () {
                    contentThumbnail.fadeIn(300);
                });
            }

            // ------------- close button

            function createCloseBtn() {
                var buttonClose = $(".close .video-player__close")
                if (!buttonClose.length)
                    buttonClose = $("<button></button>", {
                        "class": "close video-player__close close"
                    });
                var close = $("<img>", {
                    "src": "images/svg/icon-cancel-white.svg",
                    "alt": "zamknij okno",
                    "width": "10px"
                }).appendTo(buttonClose);

                buttonClose.appendTo(videoWrap);
                return buttonClose;
            }
            createCloseBtn();


            function startVideo(index) {
                videoWrap.eq(index).fadeIn(300);
            }

            function closeVideo() {
                videoWrap.fadeOut(300);
            }

            // -------------event - start

            thumbnail.on("click", function () {
                var index = $(this).index();
                let videoPlayerOpen = videoPlayer[index];
                var overlay = createOverlay(videoPlayerOpen);
                // var closeBtn = createCloseBtn(videoPlayerOpen)

                contentThumbnail.fadeOut(300, function () {
                    overlay.fadeIn(300, startVideo(index));
                });

                var buttons = contentVideo.find($(".video-player__close"));

                // -------------event - close
                buttons.on("click", function () {

                    closeOverlay();
                    closeVideo();
                    videoPlayerOpen.pause();
                });
            });
        }

        /*-------------------
            FORM-ANIMATION
        --------------------*/

        if ($("main.page--kontakt").length) {

            var btnStart = $(".pulse-icon__container--contact"),
                text = $(".section-content__text"),
                form = $(".section-content__form--contact");

            btnStart.on("click", function () {
                text.fadeOut(300, function () {
                    form.fadeIn(300);
                });
            });
        };

        /*----------------
          PRZEPIS-ANIMATION
        --------------------*/

        if ($("main.page--przepis").length) {

            var btnStart = $(".pulse-icon__container--przepis"),
                btnClose = $(".close video-player__close--przepis"),
                text = $(".section-content__text"),
                video = $(".video-player-wrap--przepis"),
                videoPlayer = document.getElementById('video-player--przepis'),
                doc = $(document);

            function startVideo() {
                text.fadeOut(300, function () {
                    video.fadeIn(300);
                });
            };

            function closeVideo() {
                video.fadeOut(300, function () {
                    text.fadeIn(300, function () {
                        videoPlayer.pause();
                        visiblePulseIcon();
                    });
                });
            }

            btnStart.on("click", function () {
                startVideo();

                videoPlayer.addEventListener("click", function (e) {
                    e.stopPropagation();
                });

                btnClose.on("click", function () {
                    closeVideo();
                });

                doc.on("click", function () {
                    closeVideo();
                });
            });
        };

        /*----------------
          FRONT-PAGE-ANIMATION
        --------------------*/
        if ($("main.page--front-page").length) {

            var btnStart = $(".pulse-icon__container--front-page"),
                videoWrap = $("#video-wrap"),
                topTextWrap = $(".section-wrap__top"),
                videoPlayerWrap = $(".video-player-wrap"),
                videoPlayer = document.getElementById('video-player--intro'),
                btnClose = $(".video-player__close"),
                main = $("main.page--front-page"),
                overlay = $(".page-overlay"),
                win = $(window),
                doc = $(document);

            function createOverlay() {
                var overlay = $(".page-overlay");
                if (!overlay.length)
                    overlay = $("<div></div>", {
                        "class": "page-overlay overlay",
                        on: {
                            click: function () {
                                videoPlayer.pause();
                                closeOverlay();
                                closeVideoPlayer();
                            }
                        }
                    }).appendTo(main);
                return overlay;
            }

            function showOverlay() {
                var overlay = createOverlay();
                overlay.fadeIn(400, showVideoPlayer);
            }

            function closeOverlay() {
                var overlay = createOverlay();
                overlay.fadeOut(500, frontPageCloseAnimation);
            }

            function showVideoPlayer() {
                videoPlayerWrap.fadeIn(500);
            }

            function closeVideoPlayer() {
                videoPlayerWrap.fadeOut(500);
            }

            function frontPageStartAnimation() {
                topTextWrap.fadeOut(300, function () {
                    videoWrap.animate({
                        "top": "-70vh"
                    }, 800, function () {
                        showOverlay();
                    });
                });
            };

            function frontPageCloseAnimation() {
                videoWrap.animate({
                    "top": ""
                }, 800, function () {
                    visiblePulseIcon()
                    topTextWrap.fadeIn(300);
                });
            };

            btnStart.on("click", frontPageStartAnimation);
            btnClose.on("click", function () {
                videoPlayer.pause();
                closeOverlay();
                closeVideoPlayer();
            });
        };

    });

})(jQuery);