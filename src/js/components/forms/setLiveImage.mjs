import { verifyURL } from "../../services/api/verifyUrl.mjs";

export function setLiveImage(tab) {
    const image = tab.querySelector("img");
    const url = tab.querySelector("input[type=url]");
    url.addEventListener("input", async () => {
        if (url.value.startsWith("https://") && await verifyURL(url.value)) {
            image.src = url.value;
        } else {
            image.src = "";
        }
    });
}
