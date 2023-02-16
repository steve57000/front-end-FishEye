function displayModal() {
    putHiddenDomElement('in')
    const modal = document.getElementById('contact_modal');
    modal.style.display = 'block'
    addMultipleAttributes(modal, {
        'aria-modal': 'true',
        'aria-expanded': 'true',
        'aria-hidden': 'false'
    })


    const  selectFocusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    addFocusElement(modal, selectFocusableElements)
}

function closeFormModal() {
    putHiddenDomElement('out')
    const modal = document.getElementById('contact_modal');
    modal.style.display = 'none'
    addMultipleAttributes(modal, {
        'aria-modal': 'false',
        'aria-expanded': 'false',
        'aria-hidden': 'true'
    })
    const buttonFocus = document.querySelector('#contact_button')
    buttonFocus.focus()
}

function closeContactConfirm() {
    localStorage.clear()
    window.location.reload();
}

function putHiddenDomElement(type) {
    const typeEl = type
    const elementNodeHidden = document.querySelectorAll('#header, #photographer_section_profil, #section-medias,  #myLightbox, .footer-photographer-page')
    elementNodeHidden.forEach(elementDom => {
        if(typeEl === 'in'){
            elementDom.setAttribute('aria-hidden', 'true')
        }
        else if(typeEl === 'out'){
            elementDom.removeAttribute('aria-hidden')
        }
        else{
            throw new Error("Le type d'ouverture et de fermeture de la modal doit être défini sur 'in' ou 'out' Le type trouvé est: '" + typeEl + "'")
        }
    })
}
