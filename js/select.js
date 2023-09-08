const select = document.querySelector(".select");
const selectTitle = select.querySelector(".select__title");
const selectLabels = select.querySelectorAll(".select__label");

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
