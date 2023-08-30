const sliderArrowPrev = document.querySelector(".slider-arrow_prev");
const sliderArrowNext = document.querySelector(".slider-arrow_next");
const sliderContent = document.querySelector(".slider-content");
const slideWidth = document.querySelector(".slide").clientWidth;
const countOfSlides = document.querySelectorAll(".slide").length;
const slideMargin = 20;
const sliderContentWidth = (slideWidth * (countOfSlides - 1)) + (slideMargin * (countOfSlides - 1));
const numberOfSliderMovements = Math.ceil((sliderContentWidth - sliderContent.clientWidth) / (slideWidth + slideMargin));
const scrollStepWidth = slideWidth + slideMargin;
let numberOfScrolledPart = 0;

const canSliderMoveRight = () => {
    return numberOfScrolledPart !== numberOfSliderMovements;
}

const canSliderMoveLeft = () => {
    return numberOfScrolledPart !== 0;
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

sliderArrowPrev.addEventListener("click", () => {
    if (canSliderMoveLeft()) {
        scrollLeft();
        numberOfScrolledPart--;
        sliderArrowNext.classList.remove('slider-arrow_disable');
    }
    else {
        sliderArrowPrev.classList.add('slider-arrow_disable');
    }
});

sliderArrowNext.addEventListener("click", () => {
    if (canSliderMoveRight()) {
        scrollRight();
        numberOfScrolledPart++;
        sliderArrowPrev.classList.remove('slider-arrow_disable');
    }
    else {
        sliderArrowNext.classList.add('slider-arrow_disable');
    }
});