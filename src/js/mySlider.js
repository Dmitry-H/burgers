(function($){
    const defaultSettings = {
        sliderDirection: "vertical",
        animationDuration: 1000,
        enableWheel: "true",
        enableSwipe: "true",
        switcherSelector: null,
        switcherActiveClass: null,
        prevSelector: null,
        nextSelector: null,
        bindLinksSelectors: null
    };

    $.fn.mySlider = function(settings) {
        const sliderRoot = $(this);
        const slides = sliderRoot.children();
        const activeSlideClass = "current-slide";
        let inScroll = false;

        sliderRoot.addClass("mySlider-slides");

        slides.eq(0).addClass(activeSlideClass);

        const initSettings = () => {
            settings.__proto__ = defaultSettings;
            initControls();
            initDirection();
            initDuration();
            initSwitcher();
            initSwipe();
            initWheel();
            initLinks();
        };

        const initWheel = () => {
            if (!settings.enableWheel) return;
            sliderRoot.on("wheel", e => {
                if (inScroll) return;
                inScroll = true;
                if (e.originalEvent.deltaY < 0) {
                  prevSlide(e);
                }
                else if (e.originalEvent.deltaY > 0) {
                  nextSlide(e);
                }

                setTimeout(() => {
                  inScroll = false;
                }, settings.animationDuration + 300);
            });
        };

        const prevSlide = e => {
            if (e) e.preventDefault();
            let newSlide = slides.filter("." + activeSlideClass).prev();
            if (!newSlide.length) return;

            goToIndex(newSlide.index())
        };

        const nextSlide = e => {
            if (e) e.preventDefault();
            let newSlide = slides.filter("." + activeSlideClass).next();
            if (!newSlide.length) return;

            goToIndex(newSlide.index())
        };

        const getPosition = slideIndex => {
            return slideIndex * -100 + "%";
        };

        const goToIndex = slideIndex => {
            let position = getPosition(slideIndex);
            sliderRoot.css({
                "transform": `${settings.changingProperty}(${position})`,
                "webkit-transform": `${settings.changingProperty}(${position})`
            });

            slides.filter("." + activeSlideClass).removeClass(activeSlideClass);
            slides.eq(slideIndex).addClass(activeSlideClass);

            changeActiveSwitcher(slideIndex);
        };

        const initSwitcher = () => {
            if (!settings.switcherSelector) return;

            let switchItems = $(settings.switcherSelector).children();
            for (let i = 0; i < switchItems.length; i++) {
                switchItems.eq(i).data("slide", i);
                switchItems.eq(i).on("click touchstart", e => {
                    let currentLink = $(e.currentTarget);
                    let index = parseInt(currentLink.data("slide"));
                    goToIndex(index);
                });
            }
        };

        const changeActiveSwitcher = index => {
            if (!settings.switcherSelector) return;

            let currentItem = $(settings.switcherSelector).children().eq(index);
            currentItem.addClass(settings.switcherActiveClass);
            currentItem.siblings().removeClass(settings.switcherActiveClass);
        };

        const initControls = () => {
            if (settings.prevSelector) {
                $(settings.prevSelector).on("click touchstart", prevSlide);
            }

            if (settings.nextSelector) {
                $(settings.nextSelector).on("click touchstart", nextSlide);
            }
        };

        const initDirection = () => {
            if (settings.sliderDirection === "vertical") {
                settings.changingProperty = "translateX";
                settings.swipePrev = "right";
                settings.swipeNext = "left";
            }
            else {
                settings.changingProperty = "translateY";
                settings.swipePrev = "down";
                settings.swipeNext = "up";
            }
        };

        const initDuration = () => {
            if (settings.animationDuration) {
                sliderRoot.css("transition", settings.animationDuration + "ms");
            }
        };

        const initLinks = () => {
            const selectorsList = settings.bindLinksSelectors;
            if (!selectorsList) return;

            for (let i = 0; i < selectorsList.length; i++) {
                let currentElement = $(selectorsList[i]);
                for (j = 0; j < currentElement.length; j++) {
                    currentElement.eq(j).on("click touchstart", e => {
                        e.preventDefault();
                        let index = parseInt($(e.currentTarget).data("slide"));
                        goToIndex(index);
                    });
                }
            }
        };

        const initSwipe = () => {
            const mobileDetect = new MobileDetect(window.navigator.userAgent);
            if (!mobileDetect.mobile() || !settings.enableSwipe) return;

            $(sliderRoot).swipe({
                swipe: function (event, direction, distance, duration, fingerCount, fingerData) {

                    switch (direction) {
                        case settings.swipePrev:
                            prevSlide();
                            break;
                        case settings.swipeNext:
                            nextSlide();
                            break
                    }
                }
            })
        };

        initSettings();
    };
})(jQuery);