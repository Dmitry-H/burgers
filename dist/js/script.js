"use strict";

/**
 * Created by Dmitry on 11.11.2017.
 */

$(document).ready(function () {
    svg4everybody();

    $(".slider__slides").mySlider({
        enableWheel: false,
        prevSelector: ".slider__arrow--prev",
        nextSelector: ".slider__arrow--next"
    });

    $(".main-wrapper__sections-wrapper").mySlider({
        sliderDirection: "horizontal",
        infiniteLoop: false,
        enableKeyboardArrows: true,
        switcherSelector: ".screen-switcher",
        switcherActiveClass: "screen-switcher__item--active",
        animationDuration: 1000,
        nextSelector: ".screen__scroll-down",
        bindLinksSelectors: [".order", ".main-nav__link", ".hamburger-menu__link"]
    });
});

window.onload = function () {

    $("#menu-open").on("click touchstart", showMenu);
    $("#menu-close").on("click touchstart", hideMenu);
    $(".hamburger-menu__link").on("click touchstart", hideMenu);

    $(".composition").on("click touchstart", toggleComposition);
    $(".composition-details__close").on("click touchstart", hideComposition);

    var employeeData = {
        rootClass: "employee",
        activeClass: "employee--active",
        containerClass: "employee__info-container",
        contentClass: "employee__info",
        sideSize: "height"
    };

    var menuData = {
        rootClass: "food-category",
        activeClass: "food-category--active",
        containerClass: "food-category__description-container",
        contentClass: "food-category__description",
        sideSize: "width"
    };

    $(".employee__name").on("click touchstart", employeeAcco.bind(null, employeeData));
    $(".employee__info").on("click touchstart", employeeAcco.bind(null, employeeData));
    $(".food-category__header-container").on("click touchstart", employeeAcco.bind(null, menuData));
    $(".food-category__description").on("click touchstart", employeeAcco.bind(null, menuData));
    $(".food-category__close").on("click touchstart", employeeAcco.bind(null, menuData));

    $(".review__detail").on("click touchstart", showReview);
    $(".review__detail-phone").on("click touchstart", showReview);
    $(".review-popup__close").on("click touchstart", hideReview);

    $(document).on("keydown", function (e) {
        if (e.keyCode === 27) {
            hideComposition();
            hideReview();
            hideMenu();
            hideFormMessage();
        }
    });

    $("#order-form").on("submit", sendForm);
    $(".form-message__close").on("click touch", hideFormMessage);
};

function initMap() {
    var zoom = void 0;

    if (window.matchMedia("(max-width: 400px)").matches) {
        zoom = 10;
    } else if (window.matchMedia("(max-width: 720px)").matches) {
        zoom = 11;
    } else {
        zoom = 12;
    }

    // let center = {lat: 59.928616, lng: 30.383887};
    var center = { lat: 59.921981, lng: 30.410323 };
    var marks = [{ lat: 59.896228, lng: 30.424273 }, { lat: 59.971850, lng: 30.309884 }, { lat: 59.893108, lng: 30.316064 }, { lat: 59.917250, lng: 30.494076 }];
    var markers = [];
    var icon = "img/map-marker.svg";
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: zoom,
        center: center,
        gestureHandling: "none"
    });

    for (var i = 0; i < marks.length; i++) {
        var marker = new google.maps.Marker({
            position: marks[i],
            map: map,
            icon: icon
        });
        markers.push(marker);
    }
}

function showMenu(e) {
    if (e) e.preventDefault();
    $("#menu").addClass("main-wrapper__hamburger-menu--visible");
    $(".main-wrapper__overlay").addClass("main-wrapper__overlay--visible");

    setTimeout(function () {
        $(document).on("click touchstart", hideMenuOnOutsideClick);
    }, 100);
}

function hideMenu(e) {
    if (e) e.preventDefault();
    $("#menu").removeClass("main-wrapper__hamburger-menu--visible");
    $(".main-wrapper__overlay").removeClass("main-wrapper__overlay--visible");
    $(document).unbind("click touchstart", hideMenuOnOutsideClick);
}

function hideMenuOnOutsideClick(e) {
    var menu = $(".hamburger-menu__list");
    if (!menu.has(e.target).length) {
        hideMenu();
    }
}

function toggleComposition(e) {
    $(e.currentTarget).siblings(".composition-details").toggleClass("composition-details--visible");

    if ($(e.currentTarget).siblings(".composition-details").hasClass("composition-details--visible")) {
        setTimeout(function () {
            $(document).on("click touchstart", hideDetailsOnOutsideClick);
        }, 100);
    } else {
        $(document).unbind("click touchstart", hideDetailsOnOutsideClick);
    }
}

function hideComposition(e) {
    if (e) e.preventDefault();
    $(".composition-details--visible").removeClass("composition-details--visible");
    $(document).unbind("click touchstart", hideDetailsOnOutsideClick);
}

function hideDetailsOnOutsideClick(e) {
    var compositionDetails = $(".composition-details--visible");
    if (!compositionDetails.has(e.target).length) {
        hideComposition();
    }
}

function employeeAcco(data, e) {
    if (e) e.preventDefault();
    var rootItem = $(e.currentTarget).closest("." + data.rootClass);
    var otherItems = rootItem.siblings();
    var otherContainers = otherItems.find("." + data.containerClass);
    var infoBlock = rootItem.find("." + data.contentClass);
    var container = rootItem.find("." + data.containerClass);
    var normalSize = void 0;

    if (data.sideSize === "width") {
        setWidth(rootItem);
    }

    normalSize = data.sideSize === "height" ? infoBlock.outerHeight() : infoBlock.outerWidth();

    if (!rootItem.hasClass(data.activeClass)) {
        rootItem.addClass(data.activeClass);
        container.css(data.sideSize, normalSize);
        otherItems.removeClass(data.activeClass);
        otherContainers.css(data.sideSize, 0);
    } else {
        rootItem.removeClass(data.activeClass);
        container.css(data.sideSize, 0);
    }
}

function setWidth(rootItem) {
    var listRoot = rootItem.closest(".food-categories");
    var headerContainer = rootItem.find(".food-category__header-container");
    var description = rootItem.find(".food-category__description");
    var actualWidth = void 0;

    if (window.matchMedia("(max-width: 720px)").matches) {
        actualWidth = listRoot.outerWidth() - headerContainer.outerWidth();
    } else if (window.matchMedia("(max-width: 960px)").matches) {
        actualWidth = listRoot.outerWidth() - headerContainer.outerWidth() * 3;
    }
    description.css("width", actualWidth);
}

function showReview(e) {
    if (e) e.preventDefault();
    var rootItemBind = $(e.currentTarget).closest(".review").data("bind");
    var review = $(".main-wrapper__review-popup[data-bind=" + rootItemBind + "]");
    $(".main-wrapper__overlay").addClass("main-wrapper__overlay--visible");
    review.addClass("main-wrapper__review-popup--visible");

    setTimeout(function () {
        $(document).on("click touchstart", hideReviewOnOutsideClick);
    }, 100);
}

function hideReview(e) {
    if (e) e.preventDefault();
    $(".main-wrapper__review-popup--visible").removeClass("main-wrapper__review-popup--visible");
    $(".main-wrapper__overlay").removeClass("main-wrapper__overlay--visible");

    $(document).unbind("click touchstart", hideReviewOnOutsideClick);
}

function hideReviewOnOutsideClick(e) {
    var menu = $(".main-wrapper__review-popup");
    if (!menu.has(e.target).length) {
        hideReview();
    }
}

function showFormMessage(success, message) {
    var messageContainer = $(".main-wrapper__form-message");
    var messageRoot = $(".form-message");

    if (success) {
        messageRoot.removeClass("form-message--error");
    } else {
        messageRoot.addClass("form-message--error");
    }
    $(".form-message__content").html(message);
    $(".main-wrapper__overlay").addClass("main-wrapper__overlay--visible");
    messageContainer.addClass("main-wrapper__form-message--visible");

    setTimeout(function () {
        $(document).on("click touchstart", hideFormMessageOnOutsideClick);
    }, 100);
}

function hideFormMessageOnOutsideClick(e) {
    var menu = $(".form-message");
    if (!menu.has(e.target).length) {
        hideFormMessage();
    }
}

function hideFormMessage(e) {
    if (e) e.preventDefault();
    $(".main-wrapper__overlay").removeClass("main-wrapper__overlay--visible");
    $(".main-wrapper__form-message--visible").removeClass("main-wrapper__form-message--visible");
}

function sendForm(e) {
    if (e) e.preventDefault();
    var form = $(e.target);
    var result = void 0;
    if (!checkFormFields(form)) {
        showFormMessage(false, "Необходимо заполнить все поля");
        return;
    }
    result = $.ajax({
        url: form.attr("action"),
        type: form.attr("method"),
        data: form.serialize(),
        dataType: "json"
    });

    result.done(function (msg) {
        if (msg["ans"] === "ok") {
            showFormMessage(true, "Данные были успешно отправлены");
            form[0].reset();
        } else {
            showFormMessage(false, "Произошла ошибка");
        }
    });

    result.fail(function (msg) {
        showFormMessage(false);
    });
}

function checkFormFields(form) {
    var fields = form.find("input, textarea");
    var fieldsOK = true;
    fields.each(function (index, element) {
        if ($(element).val() === "" && $(element).attr("name") !== "floor") {
            fieldsOK = false;
        }
    });
    return fieldsOK;
}