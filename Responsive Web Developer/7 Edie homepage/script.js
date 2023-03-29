// RESPONSIVE NAVIGATION BAR
const navUl = document.querySelector(".nav-ul");

const navResponsiveUl = document.querySelector(".nav-responsive-ul");
const responsiveButton = document.querySelector(".responsive-button");

const mediaQuery = window.matchMedia('(max-width: 768px)');

// SHOW NAVIGATION BAR FOR MOBILE
responsiveButton.addEventListener("click", ()=> {
    navResponsiveUl.classList.toggle("hide");
    
    if (navResponsiveUl.classList.contains("hide") == true) {
        responsiveButton.style.color = "var(--matte-black)";
    }
    else {
        responsiveButton.style.color = "var(--blue)";
    }
})

// SHOW NAVIGATION BAR FOR CORRESPONDING DEVICE
function navigationUl(){
    if (mediaQuery.matches) {
        // Mobile
        navUl.classList.add("hide");
        navResponsiveUl.classList.add("hide");
        responsiveButton.style.display = "block";
    }
    else {
        // Tablet and Desktop
        navResponsiveUl.classList.add("hide");
        navUl.classList.remove("hide");
        responsiveButton.style.display = "none";
    }
}

window.addEventListener("load", navigationUl);
window.addEventListener("resize", navigationUl);
window.matchMedia('(orientation: portrait)').addEventListener("change", e => {
    const portrait = e.matches;

    if (portrait) {
        navigationUl();
    }
    else {
        navigationUl();
    }
});