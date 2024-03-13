const sliderArrowLeft = document.querySelector(".slider-navigation__button_prev");
const sliderArrowRight = document.querySelector(".slider-navigation__button_next");
const slider = document.querySelector(".slider");
const countOfSlides = document.querySelectorAll(".slider-item").length;
const sliderItemWidth = document.querySelector(".slider-item").clientWidth;
const sliderGapWidth = parseInt(window.getComputedStyle(slider).getPropertyValue('gap'), 10);
const sliderContentWidth = sliderItemWidth * countOfSlides + sliderGapWidth * (countOfSlides - 1);
const sliderWindowWidth = slider.clientWidth;
const countOfSlidesInWindow = Math.floor(sliderWindowWidth / sliderItemWidth);
const sliderNavigationCountOfSlides = document.querySelector('.slider-navigation__count');
const sliderNavigationCurrentSlide = document.querySelector('.slider-navigation__current-number');
const intervalTime = 4000;

sliderNavigationCountOfSlides.textContent = countOfSlides;
sliderNavigationCurrentSlide.textContent = countOfSlidesInWindow === 0 ? 1 : countOfSlidesInWindow;

const canSliderMoveLeft = () => {
    return slider.scrollLeft !== 0;
}

const canSliderMoveRight = () => {
    return slider.scrollLeft < sliderItemWidth * 2;
}

const scroll = (scrollWidth) => {
    slider.scroll({
        left: scrollWidth,
        behavior: 'smooth'
    })
}

const scrollLeft = () => {
    if (slider.scrollLeft === 0) {
        scroll(sliderContentWidth);
        sliderNavigationCurrentSlide.textContent = countOfSlides;
    } else {
        scroll(slider.scrollLeft - sliderWindowWidth - sliderGapWidth);
        sliderNavigationCurrentSlide.textContent-=countOfSlidesInWindow;
    }
}

const scrollRight = () => {
    if (slider.scrollLeft > sliderContentWidth - sliderWindowWidth - sliderGapWidth) {
        scroll(0);
        sliderNavigationCurrentSlide.textContent = countOfSlidesInWindow;
    } else {
        scroll(slider.scrollLeft + sliderWindowWidth + sliderGapWidth);

        sliderNavigationCurrentSlide.textContent = Math.ceil(slider.scrollLeft / (sliderWindowWidth + sliderGapWidth)) + 2;
    }
}

let autoSwitch;

sliderArrowLeft.addEventListener('click', () => {
    scrollLeft();

    clearInterval(autoSwitch);
    autoSwitch = setInterval(scrollRight, intervalTime);
})

sliderArrowRight.addEventListener('click', () => {
    scrollRight();

    clearInterval(autoSwitch);
    autoSwitch = setInterval(scrollRight, intervalTime);
})

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function onVisibilityChange() {
    if (isElementInViewport(slider)) {
        autoSwitch = setInterval(scrollRight, intervalTime);
    } else {
        clearInterval(autoSwitch);
    }
}

window.addEventListener('scroll', onVisibilityChange);
document.addEventListener('DOMContentLoaded', onVisibilityChange);
