/**
 * Created by Dmitry on 11.11.2017.
 */
window.onload = function() {
    document.getElementById("menu-open").addEventListener("click", showMenu);
    document.getElementById("menu-close").addEventListener("click", hideMenu);
    document.getElementById("composition-open").addEventListener("mouseenter", showComposition);
    document.getElementById("composition-open").addEventListener("mouseleave", hideComposition);
    /*    window.addEventListener("keypress", function (e) {
        if (e.keyCode === 27) {
            hideMenu(e);
        }
    });*/
};

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