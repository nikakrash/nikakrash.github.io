const sliderArrowLeft = document.querySelector(".slider-arrow_left");
const sliderArrowRight = document.querySelector(".slider-arrow_right");
const sliderContent = document.querySelector(".slider-content");
const slideWidth = document.querySelector(".slide").clientWidth;
const countOfSlides = document.querySelectorAll(".slide").length;
const slideGapValue = window.getComputedStyle(sliderContent).getPropertyValue('gap');
const slideGap = parseInt(slideGapValue, 10);
const sliderContentWidth = (slideWidth * (countOfSlides - 1)) + (slideGap * (countOfSlides - 1));
const numberOfSliderMovements = Math.ceil((sliderContentWidth - sliderContent.clientWidth) / (slideWidth + slideGap));
const scrollStepWidth = slideWidth + slideGap;
let numberOfScrolledPart = 0;

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
    sliderContent.scroll({
        left: sliderContent.scrollLeft + scrollStepWidth,
        behavior: 'smooth'
    })
}

const scrollLeft = () => {
    sliderContent.scroll({
        left: sliderContent.scrollLeft - scrollStepWidth,
        behavior: 'smooth'
    })
}

sliderArrowLeft.addEventListener("click", () => {
    if (canSliderMoveLeft()) {
        scrollLeft();
        numberOfScrolledPart--;

        if (isItLastMoveLeft()) {
            sliderArrowLeft.classList.add('slider-arrow_disable');
        }
    }

    sliderArrowRight.classList.remove('slider-arrow_disable');
});

sliderArrowRight.addEventListener("click", () => {
    if (canSliderMoveRight()) {
        scrollRight();
        numberOfScrolledPart++;

        if (isItLastMoveRight()) {
            sliderArrowRight.classList.add('slider-arrow_disable');
        }
    }

    sliderArrowLeft.classList.remove('slider-arrow_disable');
});
