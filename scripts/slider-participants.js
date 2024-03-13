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
    }
    else {
        scroll(slider.scrollLeft - sliderWindowWidth - sliderGapWidth);
        sliderNavigationCurrentSlide.textContent-=countOfSlidesInWindow;
    }
}

const scrollRight = () => {
    if (slider.scrollLeft > sliderContentWidth - sliderWindowWidth - sliderGapWidth) {
        scroll(0);
        sliderNavigationCurrentSlide.textContent = countOfSlidesInWindow;
    }
    else {
        scroll(slider.scrollLeft + sliderWindowWidth + sliderGapWidth);
        sliderNavigationCurrentSlide.textContent = parseInt(sliderNavigationCurrentSlide.textContent) + countOfSlidesInWindow;
    }
}

let autoSwitch = setInterval(scrollRight, intervalTime);

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
