/**
 * Created by Dmitry on 11.11.2017.
 */
window.onload = function() {
    document.getElementById("menu-open").addEventListener("click", showMenu);
    document.getElementById("menu-close").addEventListener("click", hideMenu);
};

function showMenu(e) {
    e.preventDefault();
    document.getElementById("menu").classList.add("main-wrapper__hamburger-menu--visible");
}

function hideMenu(e) {
    e.preventDefault();
    document.getElementById("menu").classList.remove("main-wrapper__hamburger-menu--visible");
}