const navUl = document.querySelector(".nav__ul")

const navResponsiveUl = document.querySelector(".nav__responsive-ul")
const responsiveTitleContainer = document.querySelector(".nav__responsive-title-container")
const responsiveButton = document.querySelector(".nav__responsive-button")
const responsiveLiContainer = document.querySelector(".nav__responsive-li-container")
const responsiveContainerCross = document.querySelector(".nav__responsive-cross")

const main = document.querySelector(".main")
const footer = document.querySelector(".footer")

const mediaQuery = window.matchMedia('(min-width: 768px)')

// SHOW NAVIGATION BAR FOR MOBILE
responsiveButton.addEventListener("click", ()=> {
    responsiveTitleContainer.classList.add("hide")
    main.classList.add("hide")
    footer.classList.add("hide")
    responsiveLiContainer.classList.remove("hide")
})

// HIDE NAVIGATION BAR FOR MOBILE
responsiveContainerCross.addEventListener("click", ()=> {
    responsiveTitleContainer.classList.remove("hide")
    main.classList.remove("hide")
    footer.classList.remove("hide")
    responsiveLiContainer.classList.add("hide")
})

// SHOW NAVIGATION BAR FOR CORRESPONDING DEVICE
function navigationUl(){
    if (mediaQuery.matches) {
        navResponsiveUl.classList.add("hide")
        navUl.classList.remove("hide")
    }
    else {
        navUl.classList.add("hide")
        navResponsiveUl.classList.remove("hide")
    }
}

window.addEventListener("load", navigationUl)
window.addEventListener("resize", navigationUl)