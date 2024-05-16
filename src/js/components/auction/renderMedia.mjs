export function displayMedia(mediaData) {
    const media = document.querySelector("#auction-media");
    media.innerHTML = renderMedia(mediaData);
    if (mediaData.length > 1) {
        const carousel = new bootstrap.Carousel("#imageCarousel");
        document.querySelector(".carousel-item").classList.add("active");
        const prevBtn = document.querySelector(".carousel-control-prev");
        prevBtn.addEventListener("click", () => {
          carousel.prev();
        });
        document.querySelector(".carousel-control-next").addEventListener("click", () => {
          carousel.next();
        });  

    }
}
export function renderMedia(mediaData) {
    if (mediaData.length === 0) {
        return "";
    } else if(mediaData.length === 1) {
        return `<img class="object-fit-contain h-100 w-100" src="${mediaData[0].url}" alt="${mediaData[0].alt}">`;
    } else {
        return `
        <div class="bg-primary bg-opacity-10 ratio custom-ratio">
            <div id="imageCarousel" class="carousel-slide">
                <div class="carousel-inner h-100">
                    ${mediaCarousel(mediaData)}
                </div>
                <button class="carousel-control-prev">
                    <div class="bg-primary p-2 rounded-circle d-flex"><span class="carousel-control-prev-icon" aria-hidden></span></div>
                    <span class="visually-hidden">previous</span>
                </button>
                <button class="carousel-control-next">
                    <div class="bg-primary p-2 rounded-circle d-flex"><span class="carousel-control-next-icon" aria-hidden></span></div>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
        </div>
        `;
    }
}

function mediaCarousel(mediaArray) {
    let carouselHTML = "";
    mediaArray.forEach(media => {
        carouselHTML += `
        <div class="carousel-item h-100">
            <img class="object-fit-contain h-100 w-100" src="${media.url}" alt="${media.alt}">
        </div>
        `
    });
    return carouselHTML;
}