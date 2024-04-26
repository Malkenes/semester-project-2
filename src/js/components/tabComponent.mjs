const tabContent = document.querySelectorAll(".register-tab");
const registerForm = document.querySelector("#register-form");
const tabList = registerForm.querySelectorAll(".list-group-item");
const btnNext = document.querySelector("#next-btn");
const btnPrev = document.querySelector("#prev-btn");
let currentTab = 0;
export function tab() {
    if (registerForm) {
        showTab(0);
        btnNext.addEventListener("click", (e) => {
            e.preventDefault();
            cycleTab(1);
        })
        btnPrev.addEventListener("click", (e) => {
            e.preventDefault();
            cycleTab(-1);
        })
    }
}

function showTab(index) {
    tabContent.forEach(content => {
        content.classList.add("d-none");
    })
    tabContent[index].classList.remove("d-none");
    tabList.forEach(tab => {
        tab.classList.remove("active");
    })
    tabList[index].classList.add("active");
    if (index === 0) {
        btnPrev.style.visibility = "hidden";
    } else {
        btnPrev.style.visibility= "visible";
    }
    if (index === tabContent.length -1) {
        btnNext.innerHTML = "Register<div></div>";
    } else {
        btnNext.innerHTML = "Continue<div></div>";
    }
}

function cycleTab(index) {
    currentTab = currentTab + index;
    if (currentTab >= tabContent.length) {
        return false;
    }
    showTab(currentTab);
}