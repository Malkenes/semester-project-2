import { verifyURL } from "../services/api/verifyUrl.mjs";

const tabContent = document.querySelectorAll(".register-tab");
const registerForm = document.querySelector("#register-form");
const btnNext = document.querySelector("#next-btn");
const btnPrev = document.querySelector("#prev-btn");
const btnSubmit = document.querySelector("#submit-btn");
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
    } else {
        return;
    }
}

function showTab(index) {
    const tabList = registerForm.querySelectorAll(".list-group-item");
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
        btnNext.classList.add("d-none");
        btnSubmit.classList.remove("d-none");
    } else {
        btnNext.classList.remove("d-none");
        btnSubmit.classList.add("d-none");
    }
    if (tabContent[index].querySelector("input[type=url]")) {
        imagetest();
    }
}

function cycleTab(index) {
    if (!checkRequired()) return false;
    currentTab = currentTab + index;
    showTab(currentTab);
}
function registerListener(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    console.log(data);
}
function checkRequired() {
    const tab = tabContent[currentTab];
    const inputs = tab.querySelectorAll("input");
    inputs.forEach(input => {
        if (!input.checkValidity()) {
            input.classList.add("is-invalid");
        } else {
            input.classList.remove("is-invalid");
        }
    })
    if (!checkRepeatPassword()) return false;
    const allInputsValid = Array.from(inputs).every(input => input.checkValidity());
    return allInputsValid;
}

function checkRepeatPassword() {
    const passwords = document.querySelectorAll("input[type=password]");
    if (passwords[0].value !== passwords[1].value) {
        passwords[1].classList.add("is-invalid");
    }
    return (passwords[0].value == passwords[1].value);
}

function imagetest() {
    const banner = registerForm.querySelector(".bg-banner");
    const images = registerForm.querySelectorAll("img");
    const imageUrl = registerForm.querySelector("#floating-avatar_url");
    const bannerUrl = registerForm.querySelector("#floating-banner_url");
    imageUrl.addEventListener("input", () => {
        if (imageUrl.value.startsWith("https://") && verifyURL(imageUrl.value)) {
            images.forEach(image => {
                image.src = imageUrl.value;
            })    
        } else {
            images.forEach(image => {
                image.src = "";
            })    
        }
    })
    bannerUrl.addEventListener("input", () => {
        if (bannerUrl.value.startsWith("https://") && verifyURL(bannerUrl.value)) {
            banner.style.backgroundImage = "url(" + bannerUrl.value + ")";
            banner.style.backgroundSize = "cover";
        } else {
            banner.style.backgroundImage = "";
        }
    })
}