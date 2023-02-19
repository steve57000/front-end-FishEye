function showKeyCode(event) {
    const divSpan = document.querySelector('#affiche-keydown')
    const getKeyCode = event

    if(getKeyCode.ctrlKey && getKeyCode.code === 'AltLeft') {
        divSpan.style.display = 'flex'
    }
    if(getKeyCode.code === 'AltRight') {
        divSpan.style.display = 'none'
    }
    createSpanKeydown(getKeyCode)
}

function createSpanKeydown(getKeyCode){
    const spanKeyDown = document.querySelector('#affiche-keydown-show')
    spanKeyDown.innerHTML = `Vous avez appuyer sur: <span id="keydown-txt">${getKeyCode.code}</span>`
}


