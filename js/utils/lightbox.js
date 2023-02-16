let slideIndex = 1
// showSlides(slideIndex)

function getSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    const slides = document.getElementsByClassName("mySlides");

    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex-1].style.display = "block";

}


function openModal() {
    const lightBoxFocus = document.querySelector("#myLightbox")
    lightBoxFocus.style.display = "flex"
    lightBoxFocus.style.justifyContent = "flex-start"
    lightBoxFocus.style.alignItems = "center"

    const lightBoxFocusableElements = 'button, [tabindex]:not([tabindex="-1"])';
    addFocusElement(lightBoxFocus, lightBoxFocusableElements)

    const elementDomDisplay = document.querySelectorAll('#photographer_section_profil, #section-medias, .footer-photographer-page')
    elementDomDisplay.forEach(displayAll => {
        displayAll.style.display = "none"
    })
}

function closeModal() {
    document.getElementById("myLightbox").style.display = "none";
    const elementDomDisplay = document.querySelectorAll('#photographer_section_profil, #section-medias, .footer-photographer-page')

    elementDomDisplay[0].style.display = 'block'
    elementDomDisplay[1].style.display = 'grid'
    elementDomDisplay[2].style.display = 'flex'
}

function lightboxBtnKeyDown(event){

    switch(event.code){
        case 'ArrowUp':
        case 'ArrowRight':
            event.preventDefault()
            return getSlides(1)

        case 'ArrowDown':
        case 'ArrowLeft':
            event.preventDefault()
            return getSlides(-1)

        default :
            return
    }
}
