function menuAriaListTrue(buttonMenu) {
  addMultipleAttributes(buttonMenu, {
    "aria-expanded": "true",
    "aria-controls": "true",
    "aria-haspopup": "true",
  })
}

function menuAriaListFalse(buttonMenu) {
  addMultipleAttributes(buttonMenu, {
    "aria-expanded": "false",
    "aria-controls": "false",
    "aria-haspopup": "false",
  })
}
