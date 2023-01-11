let slideIndex = 1
showSlides(slideIndex)

function getSlides(n) {
    console.log(slideIndex)
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    console.log(slideIndex)
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    if(document.getElementsByClassName("mySlides")) {
        const slides = document.querySelectorAll(".mySlides");

        if (n > slides.length) {slideIndex = 1}
        if (n < 1) {slideIndex = slides.length}
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slides[slideIndex-1].style.display = "block";
    }
}

function openModal() {
    const lightBoxFocus = document.querySelector("#myLightbox")
    lightBoxFocus.style.display = "block";
    const  lightBoxFocusableElements = 'button, [tabindex]:not([tabindex="-1"])';
    addFocusElement(lightBoxFocus, lightBoxFocusableElements)
}

function closeModal() {
    document.getElementById("myLightbox").style.display = "none";
}

function getMediaLightbox(data) {

    data.forEach(mediaPhotographer => {
        console.log(mediaPhotographer)
        const Template = new PhotographerMediaCard(mediaPhotographer)
        this.$main.appendChild(
            Template.createPhotographerMedia()
        )
    })
}