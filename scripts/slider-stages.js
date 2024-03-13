const carouselArrowLeft = document.querySelector(".stages-list-navigation__button_prev");
const carouselArrowRight = document.querySelector(".stages-list-navigation__button_next");
const carousel = document.querySelector(".stages-list");
const slideWidth = document.querySelector(".stages-list__item").clientWidth;
const countOfCarouselSlides = 5;
const carouselContentWidth = slideWidth * countOfCarouselSlides;
const numberOfCarouselMovements = Math.ceil((carouselContentWidth - carousel.clientWidth) / slideWidth);
const navigationPointsArray = document.querySelectorAll(".stages-list-navigation__point");
let scrollWidth;
let numberOfScrolledPart = 0;

const canCarouselMoveRight = () => {
    return numberOfScrolledPart !== numberOfCarouselMovements;
}

const canCarouselMoveLeft = () => {
    return numberOfScrolledPart !== 0;
}

const isItLastMoveRight = () => {
    return numberOfScrolledPart === numberOfCarouselMovements;
}

const isItLastMoveLeft = () => {
    return numberOfScrolledPart === 0;
}

const makeNavigationPointActive = () => {
    navigationPointsArray.forEach(point => {
        point.classList.remove('stages-list-navigation__point_active');
    })

    navigationPointsArray[numberOfScrolledPart].classList.add('stages-list-navigation__point_active');
}

const scrollCarouselRight = () => {
    if (carouselContentWidth - carousel.scrollLeft > slideWidth) {
        scrollWidth = carousel.scrollLeft + slideWidth;
    }
    else {
        scrollWidth = carouselContentWidth;
    }

    carousel.scroll({
        left: scrollWidth,
        behavior: 'smooth'
    })
}

const scrollCarouselLeft = () => {
    if (carousel.scrollLeft !== carouselContentWidth) {
        scrollWidth = carousel.scrollLeft - slideWidth;
    }
    else {
        scrollWidth = 0;
    }

    carousel.scroll({
        left: scrollWidth,
        behavior: 'smooth'
    })
}

const makeArrowDisable = (arrow) => {
    arrow.classList.add('stages-list-navigation__button_disable');
}

const makeArrowEnable = (arrow) => {
    arrow.classList.remove('stages-list-navigation__button_disable');
}

carouselArrowLeft.addEventListener("click", () => {
    if (canCarouselMoveLeft()) {
        scrollCarouselLeft();
        numberOfScrolledPart--;
        makeNavigationPointActive();

        if (isItLastMoveLeft()) {
            makeArrowDisable(carouselArrowLeft);
        }
    }

    makeArrowEnable(carouselArrowRight);
});

carouselArrowRight.addEventListener("click", () => {
    if (canCarouselMoveRight()) {
        scrollCarouselRight();
        numberOfScrolledPart++;
        makeNavigationPointActive();

        if (isItLastMoveRight()) {
            makeArrowDisable(carouselArrowRight);
        }
    }

    makeArrowEnable(carouselArrowLeft);
});
