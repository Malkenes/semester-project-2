import { addTag } from "../forms/addTag.mjs";
import { addMedia } from "../forms/addMedia.mjs";
import { checkRequired } from "../forms/formValidation.mjs";
import { setExpirationDate } from "../forms/setExpirationDate.mjs";
import { setLiveImage } from "../forms/setLiveImage.mjs";
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
            if (!checkRequired(tabContent[currentTab])) return false;
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
        if (tabContent[tabIndex].classList.contains("tab-media")) {
            const addMediaBtn = document.querySelector("#media-add");
            addMediaBtn.addEventListener("click" , addMedia)
        }
    }
    if (tabContent[tabIndex].classList.contains("tab-tags")) {
        const addTagBtn = document.querySelector("#tag-add");
        addTagBtn.addEventListener("click", addTag);
    }
    if (tabContent[tabIndex].classList.contains("tab-expiration")) {
        setExpirationDate();
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
