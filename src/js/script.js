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
        console.log(e.keyCode);
        if (e.keyCode === 27) {
            hideComposition();
            hideReview();
            hideMenu();
        }
    });
};

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
    /*const rootItem = $(e.currentTarget).closest(".main-wrapper__review-popup");
    $(".main-wrapper__overlay").removeClass("main-wrapper__overlay--visible");
    rootItem.removeClass("main-wrapper__review-popup--visible");*/
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