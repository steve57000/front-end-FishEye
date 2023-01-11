function toggleShow(e) {
    // Je sélectionne la div contenant mon sous-menu filtre et lui ajoute la class 'show'
    const dropDownMenu = document.querySelector("#myDropdown")
    dropDownMenu.classList.toggle("show")
    dropDownMenu.setAttribute('aria-expanded', 'true')

    // Si l'element id déclenchant l'event correspond à l'id filter-select
    // console.log(e)
    // if (e.matches('#filter-select')) {
    //     // Je récupère la div contenant les options de filtre
    //     const dropdowns = document.querySelector('.dropdown-content')
    //
    //     for(let i = 0; i < dropdowns.length; i++) {
    //         let openDropdown = dropdowns[i]
    //
    //         if(openDropdown.classList.contains('show')) {
    //             openDropdown.classList.remove('show')
    //         }
    //     }
    // }
    addAccessibility()
}

function addAccessibility() {
    // Je récupère l'ensemble de la modal filtre
    const accessibilityFilter = document.querySelector('#filter-form-wrapper')

    // Je paramètre le type d'élément que je recherche pour le focus
    const dropDownfocusType = 'button,  [tabindex]:not([tabindex="-1"])'

    // j'appel ma fonction addFocusElement
    // je passe en paramètre la modal(accessibilityFilter) concerné
    // ainsi que le type d'élément à focalisé
    addFocusElement(accessibilityFilter, dropDownfocusType )
}

function changeInputValue(e) {
    const valueSelected = e.getAttribute("value")
    const valueTxtcontent = e.innerHTML
    const inputValue = document.getElementById('filter-select')
    inputValue.innerHTML = valueTxtcontent
    inputValue.setAttribute('value', valueSelected)

}