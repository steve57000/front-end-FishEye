function displayModal() {

    const modal = document.getElementById('contact_modal');
    console.log(modal)
    modal.style.display = 'block'
    modal.setAttribute('aria-modal', 'true')
    if(modal.getAttribute('aria-hidden')) {
        modal.removeAttribute('aria-hidden')
    }

    modal.classList.add('show')

    const  selectFocusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    addFocusElement(modal, selectFocusableElements)
}

function closeFormModal() {

    document.getElementById('contact_modal').style.display = 'none'
    const buttonFocus = document.querySelector('.contact_button')
    buttonFocus.focus()
}

function closeContactConfirm() {
    localStorage.clear()
    window.location.reload();
}

