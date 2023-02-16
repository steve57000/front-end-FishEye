function photographMediaEventListener() {
  const elements = document.querySelectorAll(".photograph_media_gallery")

  for (let i = 0; i < elements.length; i++) {
    const getElement = elements[i]
    getElement.addEventListener("focusin", (event) => {
      mediaFocusIn(event.target.parentNode.childNodes[1])
    })
    getElement.addEventListener("focusout", (event) => {
      mediaFocusOut(event.target.parentNode.childNodes[1])
    })
    getElement.addEventListener("mouseenter", (event) => {
      mediaFocusIn(event.target.parentNode.childNodes[1])
    })
    getElement.addEventListener("mouseleave", (event) => {
      mediaFocusOut(event.target.parentNode.childNodes[1])
    })
  }
}

function mediaFocusIn(element) {
  element.style.color = "#5f0e01"
  element.style.fontWeight = 'bold'
}

function mediaFocusOut(element) {
  element.style.color = "black"
  element.style.fontWeight = 'normal'
}
