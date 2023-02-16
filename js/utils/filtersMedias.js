function toggleShow(element) {
    // Je sélectionne la div contenant mon sous-menu filtre et lui ajoute la class 'show'
    const dropDownMenu = document.querySelector("#myDropdown")
    dropDownMenu.classList.toggle("show")
    addMultipleAttributes(dropDownMenu, {
        'aria-expanded': 'true',
        'aria-labelledby': 'filter-select'
    })

    const buttonMenu = document.querySelector('#filter-select')
    element.classList.toggle("show-active")
    if(element.className === 'show-active') {
        // J'appel ma fonction qui va ajouter les attributs Aria: expanded, controls, haspopup
        menuAriaListTrue(buttonMenu)
        // J'appel ma fonction pour gerer le focus accessible uniquement sur le menu filtre
        addAccessibility()
    }
    else {
        // Sinon Aria: expanded, controls, haspopup = false
        menuAriaListFalse(buttonMenu)
    }
}

function handleBtnKeyDown(event) {
    console.log(event)
    const listRemoveShow = document.querySelector('#myDropdown')
    const contactButton = document.querySelector('#contact_button')

    const buttonValue = document.querySelector('#filter-select')
    buttonValue.addEventListener('keydown', (event) => {

        let isTabPressed = event.key === 'Tab' || event.keyCode === 9;
        let isEnterPressed = event.code === 'Enter' || event.code === 'Space'

        if(!isTabPressed) {
            return
        }
        if(isEnterPressed) {
            toggleShow(event.target)
        }
        if (event.shiftKey) {
            buttonValue.removeAttribute('class')
            listRemoveShow.classList.remove('show')
            menuAriaListFalse(buttonValue)
            contactButton.focus()
        }
    })
}

function handleBtnClick(event) {
    toggleShow(event.target)
    event.preventDefault()
}

function addAccessibility() {
    // Je récupère l'ensemble de la modal filtre
    const accessibilityFilter = document.querySelector('#filter-form-wrapper')

    // Je paramètre le type d'élément que je recherche pour le focus
    const dropDownfocusType = 'button, [href],  [tabindex]:not([tabindex="-1"])'

    // j'appel ma fonction addFocusElement
    // je passe en paramètre la modal(accessibilityFilter) concerné
    // ainsi que le type d'élément à focalisé
    addFocusElement(accessibilityFilter, dropDownfocusType )
}

function filterKeyDown(event){
    const targetNextElement = event.target.nextElementSibling
    const targetPreviousElement =  event.target.previousElementSibling
    const buttonValue = document.querySelector('#filter-select')
    const option = event.target.getAttribute('value')
    switch(event.code){
        case 'Enter':
        case 'Space':
            event.preventDefault()
            buttonValue.innerHTML = ''
            buttonValue.innerHTML = event.target.innerHTML
            buttonValue.setAttribute('value', option)
            return this.filterMedias(option)

        case 'ArrowUp':
        case 'ArrowLeft':
            event.preventDefault()
            targetPreviousElement.focus()
            break

        case 'ArrowDown':
        case 'ArrowRight':
            event.preventDefault()
            targetNextElement.focus()
            break

        case 'Escape':
            event.preventDefault()
            buttonValue.focus()
            break

        default :
            return
    }
}

