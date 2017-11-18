/**
 * Created by Dmitry on 11.11.2017.
 */
window.onload = function() {

    $("#menu-open").on("click", showMenu);
    $("#menu-close").on("click", hideMenu);

    document.getElementById("composition-open").addEventListener("mouseenter", showComposition);
    document.getElementById("composition-open").addEventListener("mouseleave", hideComposition);

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

    $(".employee__name").on("click", employeeAcco.bind(null, employeeData));
    $(".food-category__header-container").on("click", employeeAcco.bind(null, menuData));
    $(".food-category__close").on("click", employeeAcco.bind(null, menuData));

    $(".review__detail").on("click", showReview);
    $(".review__detail-phone").on("click", showReview);
    $(".review-popup__close").on("click", hideReview);
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

function showComposition(e) {
    document.getElementById("composition-open").classList.add("composition--active");
    document.getElementById("composition-details").classList.add("composition-details--visible");
}

function hideComposition(e) {
    document.getElementById("composition-open").classList.remove("composition--active");
    document.getElementById("composition-details").classList.remove("composition-details--visible");
}

function employeeAcco(data, e) {
    e.preventDefault();
    const rootItem = $(e.currentTarget).parent();
    const otherItems = rootItem.siblings();
    const otherContainers = otherItems.find("." + data.containerClass);
    const infoBlock = rootItem.find("." + data.contentClass);
    const container = rootItem.find("." + data.containerClass);
    const normalSize = (data.sideSize === "height") ? infoBlock.outerHeight() : infoBlock.outerWidth();

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
