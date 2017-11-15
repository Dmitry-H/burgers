/**
 * Created by Dmitry on 11.11.2017.
 */
window.onload = function() {
    document.getElementById("menu-open").addEventListener("click", showMenu);
    document.getElementById("menu-close").addEventListener("click", hideMenu);

    document.getElementById("composition-open").addEventListener("mouseenter", showComposition);
    document.getElementById("composition-open").addEventListener("mouseleave", hideComposition);

    addEvents(document.getElementsByClassName("employee__name"));
    addEvents(document.getElementsByClassName("food-category__header-container"));
    // addEvents();

    let closeElements = document.getElementsByClassName("food-category__close");
    for (let i = 0; i < closeElements.length; i++) {
        closeElements[i].addEventListener("click", closeCurrentElement);
    }

    /*    window.addEventListener("keypress", function (e) {
        if (e.keyCode === 27) {
            hideMenu(e);
        }
    });*/
};

function addEvents(elements) {
    for (let i = 0; i < elements.length; i++) {
        elements[i].addEventListener("click", acco.bind(null, elements));
    }
}

function showMenu(e) {
    e.preventDefault();
    document.getElementById("menu").classList.add("main-wrapper__hamburger-menu--visible");
}

function hideMenu(e) {
    e.preventDefault();
    document.getElementById("menu").classList.remove("main-wrapper__hamburger-menu--visible");
}

function showComposition(e) {
    document.getElementById("composition-open").classList.add("composition--active");
    document.getElementById("composition-details").classList.add("composition-details--visible");
}

function hideComposition(e) {
    document.getElementById("composition-open").classList.remove("composition--active");
    document.getElementById("composition-details").classList.remove("composition-details--visible");
}

function acco(accoItems, e) {
    let currentElement = e.currentTarget.parentNode,
        className = currentElement.classList.item(0),
        activeClassName = className + "--active";

    if (currentElement.classList.contains(activeClassName)) {
        currentElement.classList.remove(activeClassName);
    }
    else {
        currentElement.classList.add(activeClassName);

        for (let i = 0; i < accoItems.length; i++) {
            let parent = accoItems[i].parentNode;
            if (parent.classList.contains(activeClassName) && parent !== currentElement) {
                parent.classList.remove(activeClassName);
            }
        }
    }
}

function closeCurrentElement(e) {
    e.preventDefault();
    e.currentTarget.parentNode.classList.remove("food-category--active");
}