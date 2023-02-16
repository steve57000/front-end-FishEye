function addFocusElement(groupElements, focusElementType) {
    // ajout de tous les éléments de la modal-contact pour la rendre focalisables
    const  focusableElements = focusElementType;

    // sélectionnez le modal par son identifiant

    const firstFocusableElement = groupElements.querySelectorAll(focusableElements)[0]; // obtenir le premier élément à focaliser à l'intérieur du modal
    const focusableContent = groupElements.querySelectorAll(focusableElements);
    const lastFocusableElement = focusableContent[focusableContent.length - 1]; // obtenir le dernier élément à focaliser à l'intérieur du modal

    document.addEventListener('keydown', (event) => {
        let isTabPressed = event.key === 'Tab' || event.keyCode === 9 ;
        if (!isTabPressed) {
            return
        }

        if(event.shiftKey) { // si la touche Maj est enfoncée pour la combinaison Maj + tabulation
            if (document.activeElement === firstFocusableElement) {
                lastFocusableElement.focus(); // ajouter le focus pour le dernier élément focalisable
                event.preventDefault();
            }
        }else { // si la touche de tabulation est enfoncée
            if (document.activeElement === lastFocusableElement) { // si la focalisation a atteint le dernier élément focalisable, alors focalisez le premier élément focalisable après avoir appuyé sur la tabulation
                firstFocusableElement.focus(); // ajouter le focus pour le premier élément focalisable
                event.preventDefault();
            }
        }
    });
    firstFocusableElement.focus();
}
