const select = document.querySelector('.select');
const selectTitle = select.querySelector('.select__title');
const selectLabels = select.querySelectorAll('.select__label');
const header = document.querySelector(".header");
const stickyHeader = document.querySelector(".sticky-header");

selectTitle.addEventListener('click', () => {
  if ('active' === select.getAttribute('data-state')) {
    select.setAttribute('data-state', '');
  } else {
    select.setAttribute('data-state', 'active');
  }
});

for (let i = 0; i < selectLabels.length; i++) {
  selectLabels[i].addEventListener('click', (e) => {
    selectTitle.textContent = e.target.textContent;
    select.setAttribute('data-state', '');
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
