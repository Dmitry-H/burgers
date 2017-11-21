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
        activeClass: "employee--active",
        containerClass: "employee__info-container",
        contentClass: "employee__info",
        sideSize: "height"
    };

    let menuData = {
        activeClass: "food-category--active",
        containerClass: "food-category__description-container",
        contentClass: "food-category__description",
        sideSize: "width"
    };

    $(".employee__name").on("click touchstart", employeeAcco.bind(null, employeeData));
    $(".food-category__header-container").on("click touchstart", employeeAcco.bind(null, menuData));
    $(".food-category__close").on("click touchstart", employeeAcco.bind(null, menuData));

    $(".review__detail").on("click touchstart", showReview);
    $(".review__detail-phone").on("click touchstart", showReview);
    $(".review-popup__close").on("click touchstart", hideReview);


};

function showMenu(e) {
    e.preventDefault();
    $("#menu").addClass("main-wrapper__hamburger-menu--visible");
    $(".main-wrapper__overlay").addClass("main-wrapper__overlay--visible");
}

function hideMenu(e) {
    e.preventDefault();
    $("#menu").removeClass("main-wrapper__hamburger-menu--visible");
    $(".main-wrapper__overlay").removeClass("main-wrapper__overlay--visible");
}

function toggleComposition(e) {
    $(e.currentTarget).siblings(".composition-details").toggleClass("composition-details--visible");
}

function hideComposition(e) {
    e.preventDefault();
    $(e.currentTarget).closest(".composition-details").removeClass("composition-details--visible");
}

function employeeAcco(data, e) {
    e.preventDefault();
    const rootItem = $(e.currentTarget).parent();
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
    e.preventDefault();
    const rootItemBind = $(e.currentTarget).closest(".review").data("bind");
    const review = $(".main-wrapper__review-popup[data-bind=" + rootItemBind + "]");
    $(".main-wrapper__overlay").addClass("main-wrapper__overlay--visible");
    review.addClass("main-wrapper__review-popup--visible");
}

function hideReview(e) {
    e.preventDefault();
    const rootItem = $(e.currentTarget).closest(".main-wrapper__review-popup");
    $(".main-wrapper__overlay").removeClass("main-wrapper__overlay--visible");
    rootItem.removeClass("main-wrapper__review-popup--visible");
}
