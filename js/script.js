const page = document.querySelector(".page");
const select = document.querySelector(".select");
const selectTitle = select.querySelector(".select__title");
const selectLabels = select.querySelectorAll(".select__label");
const header = document.querySelector(".header");
const stickyHeader = document.querySelector(".sticky-header");
const slider = document.querySelector(".slider__range");
const sliderValue = document.querySelector(".slider__value");
const menu = document.querySelector(".menu");
const headerMenuButton = document.querySelector(".header__menu-button");
const stickyHeaderMenuButton = document.querySelector(".sticky-header__menu-button");
const headerMenuButtonIcon = document.querySelector(".header__menu-button .menu-icon");
const stickyHeaderMenuButtonIcon = document.querySelector(".sticky-header__menu-button .menu-icon");

selectTitle.addEventListener("click", () => {
  if ("active" === select.getAttribute("data-state")) {
    select.setAttribute("data-state", "");
  } else {
    select.setAttribute("data-state", "active");
  }
});

for (let i = 0; i < selectLabels.length; i++) {
  selectLabels[i].addEventListener("click", (e) => {
    selectTitle.textContent = e.target.textContent;
    select.setAttribute("data-state", "");
  });
}

const toggleStickyHeader = () => {
  const isHeaderOutsideOfWindow = window.pageYOffset >= header.clientHeight;

  if (isHeaderOutsideOfWindow) {
    stickyHeader.classList.remove("sticky-header_disable");
  } else {
    stickyHeader.classList.add("sticky-header_disable");
  }
}

window.onscroll = () => {
  toggleStickyHeader();
};

slider.addEventListener("click", () => {
  sliderValue.textContent = slider.value;
})

const toggleMenu = () => {
  menu.classList.toggle("menu_open");
  page.classList.toggle("page_scroll_off");
}

headerMenuButton.addEventListener("click", () => {
  toggleMenu();
  headerMenuButtonIcon.classList.toggle("menu-icon_cross");
});

stickyHeaderMenuButton.addEventListener("click", () => {
  toggleMenu();
  stickyHeaderMenuButtonIcon.classList.toggle("menu-icon_cross");
});
