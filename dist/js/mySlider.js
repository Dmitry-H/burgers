"use strict";

(function ($) {
    var defaultSettings = {
        sliderDirection: "vertical",
        animationDuration: 1000,
        enableWheel: true,
        enableSwipe: true,
        enableKeyboardArrows: false,
        infiniteLoop: true,
        switcherSelector: null,
        switcherActiveClass: null,
        prevSelector: null,
        nextSelector: null,
        bindLinksSelectors: null
    };

    $.fn.mySlider = function (settings) {
        var sliderRoot = $(this);
        var slides = sliderRoot.children();
        var activeSlideClass = "current-slide";
        var inScroll = false;

        var initSettings = function initSettings() {
            sliderRoot.addClass("mySlider-slides");
            slides.eq(0).addClass(activeSlideClass);
            settings.__proto__ = defaultSettings;
            initControls();
            initDirection();
            initDuration();
            initSwitcher();
            initSwipe();
            initWheel();
            initLinks();
            initArrows();
        };

        var initWheel = function initWheel() {
            if (!settings.enableWheel) return;
            sliderRoot.on("wheel", function (e) {
                if (inScroll) return;
                inScroll = true;
                if (e.originalEvent.deltaY < 0) {
                    prevSlide(e);
                } else if (e.originalEvent.deltaY > 0) {
                    nextSlide(e);
                }

                setTimeout(function () {
                    inScroll = false;
                }, settings.animationDuration + 300);
            });
        };

        var prevSlide = function prevSlide(e) {
            if (e) e.preventDefault();
            var newSlide = slides.filter("." + activeSlideClass).prev();
            var newIndex = newSlide.index();
            if (!newSlide.length) {
                if (settings.infiniteLoop) {
                    newIndex = slides.length - 1;
                } else {
                    return;
                }
            }

            goToIndex(newIndex);
        };

        var nextSlide = function nextSlide(e) {
            if (e) e.preventDefault();
            var newSlide = slides.filter("." + activeSlideClass).next();
            var newIndex = newSlide.index();
            if (!newSlide.length) {
                if (settings.infiniteLoop) {
                    newIndex = 0;
                } else {
                    return;
                }
            }

            goToIndex(newIndex);
        };

        var getPosition = function getPosition(slideIndex) {
            return slideIndex * -100 + "%";
        };

        var goToIndex = function goToIndex(slideIndex) {
            var position = getPosition(slideIndex);
            sliderRoot.css({
                "transform": settings.changingProperty + "(" + position + ")",
                "webkit-transform": settings.changingProperty + "(" + position + ")"
            });

            slides.filter("." + activeSlideClass).removeClass(activeSlideClass);
            slides.eq(slideIndex).addClass(activeSlideClass);

            changeActiveSwitcher(slideIndex);
        };

        var initSwitcher = function initSwitcher() {
            if (!settings.switcherSelector) return;

            var switchItems = $(settings.switcherSelector).children();
            for (var i = 0; i < switchItems.length; i++) {
                switchItems.eq(i).data("slide", i);
                switchItems.eq(i).on("click touchstart", function (e) {
                    if (e) e.preventDefault();
                    var currentLink = $(e.currentTarget);
                    var index = parseInt(currentLink.data("slide"));
                    goToIndex(index);
                });
            }
        };

        var changeActiveSwitcher = function changeActiveSwitcher(index) {
            if (!settings.switcherSelector) return;

            var currentItem = $(settings.switcherSelector).children().eq(index);
            currentItem.addClass(settings.switcherActiveClass);
            currentItem.siblings().removeClass(settings.switcherActiveClass);
        };

        var initControls = function initControls() {
            if (settings.prevSelector) {
                $(settings.prevSelector).on("click touchstart", prevSlide);
            }

            if (settings.nextSelector) {
                $(settings.nextSelector).on("click touchstart", nextSlide);
            }
        };

        var initArrows = function initArrows() {
            if (!settings.enableKeyboardArrows) return;

            $(document).on("keydown", function (e) {
                switch (e.keyCode) {
                    case settings.keyPrev:
                        prevSlide();
                        break;
                    case settings.keyNext:
                        nextSlide();
                        break;
                }
            });
        };

        var initDirection = function initDirection() {
            if (settings.sliderDirection === "vertical") {
                settings.changingProperty = "translateX";
                settings.swipePrev = "right";
                settings.swipeNext = "left";
                settings.keyPrev = 37;
                settings.keyNext = 37;
            } else {
                settings.changingProperty = "translateY";
                settings.swipePrev = "down";
                settings.swipeNext = "up";
                settings.keyPrev = 38;
                settings.keyNext = 40;
            }
        };

        var initDuration = function initDuration() {
            if (settings.animationDuration) {
                sliderRoot.css("transition", settings.animationDuration + "ms");
            }
        };

        var initLinks = function initLinks() {
            var selectorsList = settings.bindLinksSelectors;
            if (!selectorsList) return;

            for (var i = 0; i < selectorsList.length; i++) {
                var currentElement = $(selectorsList[i]);
                for (var j = 0; j < currentElement.length; j++) {
                    currentElement.eq(j).on("click touchstart", function (e) {
                        e.preventDefault();
                        var index = parseInt($(e.currentTarget).data("slide"));
                        goToIndex(index);
                    });
                }
            }
        };

        var initSwipe = function initSwipe() {
            var mobileDetect = new MobileDetect(window.navigator.userAgent);
            if (!mobileDetect.mobile() || !settings.enableSwipe) return;

            $(sliderRoot).swipe({
                swipe: function swipe(event, direction, distance, duration, fingerCount, fingerData) {

                    switch (direction) {
                        case settings.swipePrev:
                            prevSlide();
                            break;
                        case settings.swipeNext:
                            nextSlide();
                            break;
                    }
                }
            });
        };

        initSettings();
    };
})(jQuery);