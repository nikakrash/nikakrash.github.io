const sliderArrowPrev = document.querySelector(".slider-navigation__button_prev");
const sliderArrowNext = document.querySelector(".slider-navigation__button_next");
const sliderContent = document.querySelector(".slider");
const slideWidth = document.querySelector(".slider-item").clientWidth;
const countOfSlides = document.querySelectorAll(".slider-item").length;
const slideGapValue = window.getComputedStyle(sliderContent).getPropertyValue('gap');
const slideGap = parseInt(slideGapValue, 10);
const sliderContentWidth = (slideWidth * countOfSlides) + (slideGap * (countOfSlides - 1));
const numberOfSliderMovements = Math.ceil((sliderContentWidth - sliderContent.clientWidth) / (slideWidth + slideGap));
const currentSlideNumber = document.querySelector(".slider-navigation__current-number");
const navigationSlidesCount = document.querySelector(".slider-navigation__count");
let scrollWidth;
let numberOfScrolledPart = 0;

navigationSlidesCount.textContent = countOfSlides;

const canSliderMoveRight = () => {
    // return numberOfScrolledPart !== numberOfSliderMovements;
    return true;
}

const canSliderMoveLeft = () => {
    // return numberOfScrolledPart !== 0;
    return true;
}

const isItLastMoveRight = () => {
    return numberOfScrolledPart === numberOfSliderMovements;
}

const isItLastMoveLeft = () => {
    return numberOfScrolledPart === 0;
}

const scrollRight = () => {
    if (sliderContentWidth - sliderContent.scrollLeft > slideWidth) {
        scrollWidth = sliderContent.scrollLeft + slideWidth + slideGap;
    }
    else {
        scrollWidth = sliderContentWidth;
    }

    sliderContent.scroll({
        left: scrollWidth,
        behavior: 'smooth'
    })

    currentSlideNumber.textContent++;
}

const scrollLeft = () => {
    if (sliderContentWidth - sliderContent.scrollLeft > slideWidth) {
        scrollWidth = sliderContent.scrollLeft - slideWidth - slideGap;
    }
    else {
        scrollWidth = 0;
    }

    sliderContent.scroll({
        left: scrollWidth,
        behavior: 'smooth'
    })

    currentSlideNumber.textContent--;
}

// const makeArrowDisable = (arrow) => {
//     arrow.classList.add('slider-navigation__button_disable');
// }

// const makeArrowEnable = (arrow) => {
//     arrow.classList.remove('slider-navigation__button_disable');
// }

sliderArrowPrev.addEventListener("click", () => {
    if (canSliderMoveLeft()) {
        scrollLeft();
        numberOfScrolledPart--;

        if (isItLastMoveLeft()) {
            makeArrowDisable(sliderArrowPrev);
        }
    }

    makeArrowEnable(sliderArrowNext);
});

sliderArrowNext.addEventListener("click", () => {
    if (canSliderMoveRight()) {
        scrollRight();
        numberOfScrolledPart++;

        if (isItLastMoveRight()) {
            makeArrowDisable(sliderArrowNext);
        }
    }

    makeArrowEnable(sliderArrowPrev);
});