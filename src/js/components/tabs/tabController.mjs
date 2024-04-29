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
            if (!checkRequired()) return false;
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
        setLiveImage(tabContent[tabIndex]);
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

function setLiveImage(tab) {
    const image = tab.querySelector("img");
    const url = tab.querySelector("input[type=url]");
    url.addEventListener("input", async () => {
        if (url.value.startsWith("https://") && await verifyURL(url.value)) {
            image.src = url.value;
        } else {
            image.src = "";
        }  
    })
}
