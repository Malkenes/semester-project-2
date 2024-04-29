import { checkRepeatPassword } from "../../utils/validation.mjs";
import { verifyURL } from "../../services/api/verifyUrl.mjs";

const tabContent = document.querySelectorAll(".tab");
const btnNext = document.querySelector("#next-btn");
const btnPrev = document.querySelector("#prev-btn");
const btnSubmit = document.querySelector("#submit-btn");
let currentTab = 0;

export function tab(form) {
    if (form) {
        showTab(0, form);
        btnNext.addEventListener("click", (e) => {
            e.preventDefault();
            cycleTab(1,form);
        })
        btnPrev.addEventListener("click", (e) => {
            e.preventDefault();
            cycleTab(-1,form);
        })
    } else {
        return;
    }
}

function showTab(tabIndex, form) {
    const tabList = form.querySelectorAll(".list-group-item");

    tabContent.forEach(content => {
        content.classList.add("d-none");
    })
    tabContent[tabIndex].classList.remove("d-none");

    tabList.forEach(tab => {
        tab.classList.remove("active");
    })
    tabList[tabIndex].classList.add("active");

    updateTabNavigation(tabIndex, (tabContent.length -1));

    if (tabContent[tabIndex].querySelector("input[type=url]")) {
        imagetest(form);
    }
}

function updateTabNavigation(tabIndex,lastTabIndex) {
    if (tabIndex === 0) {
        btnPrev.style.visibility = "hidden";
    } else {
        btnPrev.style.visibility= "visible";
    }

    if (tabIndex === lastTabIndex) {
        btnNext.classList.add("d-none");
        btnSubmit.classList.remove("d-none");
    } else {
        btnNext.classList.remove("d-none");
        btnSubmit.classList.add("d-none");
    }
}

function cycleTab(tabIndex,form) {
    if (!checkRequired()) return false;
    currentTab = currentTab + tabIndex;
    showTab(currentTab,form);
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

function imagetest(form) {
    const banner = form.querySelector(".bg-banner");
    const images = form.querySelectorAll("img");
    const imageUrl = form.querySelector("#floating-avatar_url");
    const bannerUrl = form.querySelector("#floating-banner_url");
    imageUrl.addEventListener("input", async () => {
        if (imageUrl.value.startsWith("https://") && await verifyURL(imageUrl.value)) {
            images.forEach(image => {
                image.src = imageUrl.value;
            })    
        } else {
            images.forEach(image => {
                image.src = "";
            })    
        }
    })
    bannerUrl.addEventListener("input", async () => {
        if (bannerUrl.value.startsWith("https://") && await verifyURL(bannerUrl.value)) {
            banner.style.backgroundImage = "url(" + bannerUrl.value + ")";
            banner.style.backgroundSize = "cover";
        } else {
            banner.style.backgroundImage = "";
        }
    })
}