const header = document.querySelector(".header");
const stickyHeader = document.querySelector(".sticky-header");

const toggleStickyHeader = () => {
  const isHeaderOutsideOfWindow = window.pageYOffset >= header.clientHeight - stickyHeader.clientHeight;

  if (isHeaderOutsideOfWindow) {
    stickyHeader.classList.remove("sticky-header_disable");
  } else {
    stickyHeader.classList.add("sticky-header_disable");
  }
}

const toggleDesktopMenu = () => {
  const isMenuInsideOfHeader = window.pageYOffset <= header.clientHeight - stickyHeader.clientHeight;

  if (isMenuInsideOfHeader) {
    closeMenu();
  }
}

window.onscroll = () => {
  toggleStickyHeader();
  toggleDesktopMenu();
};

const menu = document.querySelector(".menu");
const openMenuButton = document.querySelector(".sticky-header__open-menu-button");
const closeMenuButton = document.querySelector(".menu__close-button");
const openMobileMenuButton = document.querySelector(".mobile-header__open-menu-button");
const closeMobileMenuButton = document.querySelector(".menu__close-button-mobile");
const page = document.querySelector(".page");

const openMenu = () => {
  menu.classList.add("menu_open");
}

const openMobileMenu = () => {
  openMenu();
  page.classList.add("page_scroll_off");
}

const closeMenu = () => {
  menu.classList.remove("menu_open");
}

const closeMobileMenu = () => {
  closeMenu();
  page.classList.remove("page_scroll_off");
}

openMenuButton.addEventListener("click", openMenu);
closeMenuButton.addEventListener("click", closeMenu);
openMobileMenuButton.addEventListener("click", openMobileMenu);
closeMobileMenuButton.addEventListener("click", closeMobileMenu);

const buttonToNews = document.querySelector(".navigation-button");
const dropdownMenuNews = document.querySelector(".navigation__dropdown-menu_click");
const verticalMenuItems = document.querySelectorAll(".navigation__item_vertical");
const buttonToNewsArrowItems = document.querySelectorAll(".navigation__button_arrow");

const toggleDropDownMenu = () => {
  dropdownMenuNews.classList.toggle("dropdown-menu_click-open");
  verticalMenuItems.forEach(item => item.classList.toggle("navigation__item_margin-min"));
  buttonToNewsArrowItems.forEach(item => item.classList.toggle("navigation__button_arrow_down"));
}

buttonToNews.addEventListener("click", toggleDropDownMenu);

const sliderArrowLeft = document.querySelector(".slider-navigation__arrow_left");
const sliderArrowRight = document.querySelector(".slider-navigation__arrow_right");
const sliderContent = document.querySelector(".slider-content");
const slideWidth = document.querySelector(".slide").clientWidth;
const countOfSlides = document.querySelectorAll(".slide").length;
const slideMargin = 20;
const sliderContentWidth = (slideWidth * (countOfSlides - 1)) + (slideMargin * (countOfSlides - 1));
const numberOfSliderMovements = Math.ceil((sliderContentWidth - sliderContent.clientWidth) / (slideWidth + slideMargin));
let scrollStepWidth;
let numberOfScrolledPart = 0;

const changeIndicator = () => {
  const scrolledWidth = (sliderContent.clientWidth / numberOfSliderMovements) * numberOfScrolledPart;

  document.getElementById("indicator").style.width = scrolledWidth + "px";
}

const increaseIndicator = () => {
  numberOfScrolledPart++;

  changeIndicator();
}

const decreaseIndicator = () => {
  numberOfScrolledPart--;

  changeIndicator();
}

const canSliderMoveRight = () => {
  return numberOfScrolledPart !== numberOfSliderMovements;
}

const canSliderMoveLeft = () => {
  return numberOfScrolledPart !== 0;
}

const scrollRight = () => {
  if (sliderContentWidth - sliderContent.scrollLeft > slideWidth) {
    scrollStepWidth = slideWidth + slideMargin;
  }
  else if (sliderContentWidth - sliderContent.scrollLeft === slideWidth) {
    scrollStepWidth = slideWidth;
  }
  else {
    scrollStepWidth = 0;
  }

  sliderContent.scroll({
    left: sliderContent.scrollLeft + scrollStepWidth,
    behavior: 'smooth'
  })
}

const scrollLeft = () => {
  if (sliderContent.clientWidth - sliderContent.scrollLeft === slideWidth) {
    scrollStepWidth = slideWidth + slideMargin;
  }
  else {
    scrollStepWidth = slideWidth;
  }

  sliderContent.scroll({
    left: sliderContent.scrollLeft - scrollStepWidth,
    behavior: 'smooth'
  })
}

sliderArrowLeft.addEventListener("click", () => {
  if (canSliderMoveLeft()) {
    scrollLeft();
    setTimeout(decreaseIndicator, 200);
  }
});

sliderArrowRight.addEventListener("click", () => {
  if (canSliderMoveRight()) {
    scrollRight();
    setTimeout(increaseIndicator, 200);
  }
});