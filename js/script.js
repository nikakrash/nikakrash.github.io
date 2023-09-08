const page = document.querySelector(".page");
const header = document.querySelector(".header");
const menu = document.querySelector(".menu");
const closeMenuButton = document.querySelector(".menu__close-button");
const openMobileMenuButton = document.querySelector(".mobile-header__open-menu-button");
const closeMobileMenuButton = document.querySelector(".menu__close-button-mobile");
const stickyHeader = document.querySelector(".sticky-header");
const openMenuButton = document.querySelector(".sticky-header__open-menu-button");
const buttonToNews = document.querySelector(".navigation-button");
const dropdownMenuNews = document.querySelector(".navigation__dropdown-menu_click");
const verticalMenuItems = document.querySelectorAll(".navigation__item_vertical");
const buttonToNewsArrowItems = document.querySelectorAll(".navigation__button_arrow");

const toggleStickyHeader = () => {
  const isHeaderOutsideOfWindow = window.pageYOffset >= header.clientHeight - stickyHeader.clientHeight;

  if (isHeaderOutsideOfWindow) {
    stickyHeader.classList.remove("sticky-header_disable");
  }
  else {
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

const toggleDropDownMenu = () => {
  dropdownMenuNews.classList.toggle("dropdown-menu_click-open");
  verticalMenuItems.forEach(item => item.classList.toggle("navigation__item_margin-min"));
  buttonToNewsArrowItems.forEach(item => item.classList.toggle("navigation__button_arrow_down"));
}

buttonToNews.addEventListener("click", toggleDropDownMenu);
