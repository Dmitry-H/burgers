/**
 * Created by Dmitry on 11.11.2017.
 */

$(document).ready(() => {
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
        bindLinksSelectors: [
            ".order",
            ".main-nav__link",
            ".hamburger-menu__link"
        ]
    });
});

window.onload = function() {

    $("#menu-open").on("click touchstart", showMenu);
    $("#menu-close").on("click touchstart", hideMenu);
    $(".hamburger-menu__link").on("click touchstart", hideMenu);

    $(".composition").on("click touchstart", toggleComposition);
    $(".composition-details__close").on("click touchstart", hideComposition);

    let employeeData = {
        rootClass: "employee",
        activeClass: "employee--active",
        containerClass: "employee__info-container",
        contentClass: "employee__info",
        sideSize: "height"
    };

    let menuData = {
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

    $(document).on("keydown", e => {
        if (e.keyCode === 27) {
            hideComposition();
            hideReview();
            hideMenu();
            hideFormMessage();
        }
    });

    $("#order-form").on("submit", sendForm);
    $(".form-message__close").on("click touch", hideFormMessage)
};

function initMap() {
    let center = {lat: 59.935164, lng: 30.339427};
    let marks = [
        {lat: 59.896228, lng: 30.424273},
        {lat: 59.971850, lng: 30.309884},
        {lat: 59.893108, lng: 30.316064},
        {lat: 59.917250, lng: 30.494076}
    ];
    let markers = [];
    let icon = "img/map-marker.svg";
    let map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: center,
        gestureHandling: "none"
    });

    for (let i = 0; i < marks.length; i++) {
        let marker= new google.maps.Marker({
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

    setTimeout(()=> {
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
    let menu = $(".hamburger-menu__list");
    if(!menu.has(e.target).length) {
        hideMenu();
    }
}

function toggleComposition(e) {
    $(e.currentTarget).siblings(".composition-details").toggleClass("composition-details--visible");

    if ($(e.currentTarget).siblings(".composition-details").hasClass("composition-details--visible")) {
        setTimeout(()=> {
            $(document).on("click touchstart", hideDetailsOnOutsideClick);
        }, 100);
    }
    else {
        $(document).unbind("click touchstart", hideDetailsOnOutsideClick);
    }
}

function hideComposition(e) {
    if (e) e.preventDefault();
    $(".composition-details--visible").removeClass("composition-details--visible");
    $(document).unbind("click touchstart", hideDetailsOnOutsideClick);
}

function hideDetailsOnOutsideClick(e) {
    let compositionDetails = $(".composition-details--visible");
    if(!compositionDetails.has(e.target).length) {
        hideComposition();
    }
}

function employeeAcco(data, e) {
    if (e) e.preventDefault();
    const rootItem = $(e.currentTarget).closest("." + data.rootClass);
    const otherItems = rootItem.siblings();
    const otherContainers = otherItems.find("." + data.containerClass);
    const infoBlock = rootItem.find("." + data.contentClass);
    const container = rootItem.find("." + data.containerClass);
    let normalSize;

    if (data.sideSize === "width") {
        setWidth(rootItem);
    }

    normalSize = (data.sideSize === "height") ? infoBlock.outerHeight() : infoBlock.outerWidth()

    if (!rootItem.hasClass(data.activeClass)) {
        rootItem.addClass(data.activeClass);
        container.css(data.sideSize, normalSize);
        otherItems.removeClass(data.activeClass);
        otherContainers.css(data.sideSize, 0);

    }
    else {
        rootItem.removeClass(data.activeClass);
        container.css(data.sideSize, 0);
    }
}

function setWidth(rootItem) {
    const listRoot = rootItem.closest(".food-categories");
    const headerContainer = rootItem.find(".food-category__header-container");
    const description = rootItem.find(".food-category__description");
    let actualWidth;

    if (window.matchMedia("(max-width: 720px)").matches) {
        actualWidth = listRoot.outerWidth() - headerContainer.outerWidth();
    }
    else if (window.matchMedia("(max-width: 960px)").matches) {
        actualWidth = listRoot.outerWidth() - headerContainer.outerWidth() * 3;
    }
    description.css("width", actualWidth);
}

function showReview(e) {
    if (e) e.preventDefault();
    const rootItemBind = $(e.currentTarget).closest(".review").data("bind");
    const review = $(".main-wrapper__review-popup[data-bind=" + rootItemBind + "]");
    $(".main-wrapper__overlay").addClass("main-wrapper__overlay--visible");
    review.addClass("main-wrapper__review-popup--visible");

    setTimeout(()=> {
        $(document).on("click touchstart", hideReviewOnOutsideClick);
    }, 100);
}

function hideReview(e) {
    if (e) e.preventDefault();
    $(".main-wrapper__review-popup--visible").removeClass("main-wrapper__review-popup--visible");
    $(".main-wrapper__overlay").removeClass("main-wrapper__overlay--visible");

    $(document).unbind("click touchstart", hideReviewOnOutsideClick)
}

function hideReviewOnOutsideClick(e) {
    let menu = $(".main-wrapper__review-popup");
    if(!menu.has(e.target).length) {
        hideReview();
    }
}

function showFormMessage(success, message) {
    const messageContainer = $(".main-wrapper__form-message");
    const messageRoot = $(".form-message");

    if (success) {
        messageRoot.removeClass("form-message--error");
    }
    else {
        messageRoot.addClass("form-message--error");
    }
    $(".form-message__content").html(message);
    $(".main-wrapper__overlay").addClass("main-wrapper__overlay--visible");
    messageContainer.addClass("main-wrapper__form-message--visible")

    setTimeout(()=> {
        $(document).on("click touchstart", hideFormMessageOnOutsideClick);
    }, 100);
}

function hideFormMessageOnOutsideClick(e) {
    let menu = $(".form-message");
    if(!menu.has(e.target).length) {
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
    const form = $(e.target);
    let result;
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

    result.done(msg => {
        if (msg["ans"] === "ok") {
            showFormMessage(true, "Данные были успешно отправлены");
            form[0].reset();
        }
        else {
            showFormMessage(false, "Произошла ошибка");
        }
    });

    result.fail(msg => {
        showFormMessage(false);
    });
}

function checkFormFields(form) {
    let fields = form.find("input, textarea");
    let fieldsOK = true;
    fields.each((index, element) => {
        if ($(element).val() === "" && $(element).attr("name") !=="floor") {
            fieldsOK = false;
        }
    });
    return fieldsOK;
}