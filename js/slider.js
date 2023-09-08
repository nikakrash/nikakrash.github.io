const sliderArrowLeft = document.querySelector(".slider-navigation__arrow_left");
const sliderArrowRight = document.querySelector(".slider-navigation__arrow_right");
const sliderContent = document.querySelector(".slider-content");
const slideWidth = document.querySelector(".slide").clientWidth;
const countOfSlides = document.querySelectorAll(".slide").length;
const slideGapValue = window.getComputedStyle(sliderContent).getPropertyValue('gap');
const slideGap = parseInt(slideGapValue, 10);
const sliderContentWidth = (slideWidth * countOfSlides) + (slideGap * (countOfSlides - 1));
const numberOfSliderMovements = Math.ceil((sliderContentWidth - sliderContent.clientWidth) / (slideWidth + slideGap));
let scrollWidth;
let numberOfScrolledPart = 0;

const changeIndicator = () => {
    const scrolledWidth = (sliderContent.clientWidth / numberOfSliderMovements) * numberOfScrolledPart;
    document.getElementById("indicator").style.width = scrolledWidth + "px";
}

const canSliderMoveRight = () => {
    return numberOfScrolledPart !== numberOfSliderMovements;
}

const canSliderMoveLeft = () => {
    return numberOfScrolledPart !== 0;
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
}

const makeArrowDisable = (arrow) => {
    arrow.classList.add('slider-navigation__arrow_disable');
}

const makeArrowEnable = (arrow) => {
    arrow.classList.remove('slider-navigation__arrow_disable');
}

sliderArrowLeft.addEventListener("click", () => {
    if (canSliderMoveLeft()) {
        scrollLeft();
        setTimeout(changeIndicator, 200);
        numberOfScrolledPart--;

        if (isItLastMoveLeft()) {
            makeArrowDisable(sliderArrowLeft);
        }
    }

    makeArrowEnable(sliderArrowRight);
});

sliderArrowRight.addEventListener("click", () => {
    if (canSliderMoveRight()) {
        scrollRight();
        setTimeout(changeIndicator, 200);
        numberOfScrolledPart++;

        if (isItLastMoveRight()) {
            makeArrowDisable(sliderArrowRight);
        }
    }

    makeArrowEnable(sliderArrowLeft);
});
