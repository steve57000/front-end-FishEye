class Form {
    constructor() {
        this.$main = document.getElementById('main')


        this.$wrapper = document.createElement('div')
        addMultipleAttributes(this.$wrapper, {
            'id': 'contact_modal',
            'class': 'modal fade',
            'tabindex': '-1',
            'role': 'dialog',
            'aria-labelledby': 'modal_label',
            'aria-hidden': 'true'
        })
        this.$wrapper.className = 'modal fade'

        this.$modalWrapper = document.createElement('div')
        this.$modalWrapper.className = 'modal-dialog'

        addMultipleAttributes(this.$modalWrapper, {
            'role': 'document',
            'class': 'modal-dialog'
        })

        this.$modalWrapperContent = document.createElement('div')
        this.$modalWrapperContent.className = 'modal-content'


        this.$main.appendChild(this.$wrapper)

        this.name = document.querySelector('h1').innerHTML
    }

    onControlInput() {
        const regex = {
            firstname : /^[a-zA-Z\d ]*$/i,
            lastname : /^[a-zA-Z\d ]*$/i,
            email : /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d1,3}])|(([a-zA-Z\-\d]+\.)+[a-zA-Z]{2,}))$/i,
            message : /^[a-zA-Z\d ]*$/i
        }

        const formDataElement = this.$wrapper.querySelectorAll('.formData')
        for(let i = 0; i < formDataElement.length; i++){

            const errorMessage = document.createElement('span')
            errorMessage.innerText = 'Invalid input'

            formDataElement[i].children[1].addEventListener('change', e => {
                e.preventDefault()
                const testValue = e.target.value
                const regTest = regex[e.target.id]

                if(regTest.test(testValue) !== true){
                    errorMessage.style.display = 'block'
                    e.target.parentNode.appendChild(errorMessage)
                }
                else {
                    errorMessage.style.display = 'none'
                }
            })
        }
    }
    onSubmitForm() {

        this.$wrapper
        .querySelector('form')
        .addEventListener('submit', e => {
            e.preventDefault()

            const firstNameInputValue = this
            .$wrapper
            .querySelector('#firstname')
                .value

            const lastNameInputValue = this
            .$wrapper
            .querySelector('#lastname')
                .value


            const emailInputValue = this
            .$wrapper
            .querySelector('#email')
                .value

            const messageInputValue = this
            .$wrapper
            .querySelector('#message')
                .value

            const user = new User({
                firstName: firstNameInputValue,
                lastName: lastNameInputValue,
                email: emailInputValue,
                message: messageInputValue
            })

            if (user.user) {
                this.userFirstName = user.firstName
                this.userLastName = user.lastName
                this.userEmail = user.email
                this.userMessage = user.message

                this.$modalWrapperContent.innerHTML = `
                    <img src="assets/icons/close.svg" onclick="closeContactConfirm()" alt="Fermez le formulaire"/>
                    <p>Merci ${this.userFirstName} ${this.userLastName} pour votre message: <br/>
                    ${this.userMessage}
                    </p>
                    <p>${this.name} vous contactera sur votre email: <br/> ${this.userEmail}<p>   
                `
            }
            else {
                const errorMessage = document.createElement('span')
                errorMessage.innerHTML = "veuillez corrigé"
                this.$wrapper.appendChild = errorMessage
            }
        })
    }

    createForm() {
        const modalHeader = document.createElement('header')
        modalHeader.className = 'modal-header'

        const titleHeader = document.createElement('h2')
        titleHeader.innerHTML = `Contactez-moi : <br/>${this.name}`
        addMultipleAttributes(titleHeader, {
            'id': 'modal_label',
            'class': 'modal-title'
        })

        // const closeButton = document.createElement('button')
        // addMultipleAttributes(closeButton, {
        //     'type': 'button',
        //     'class': 'close',
        //     'aria-label': 'Close',
        //     'data-dismiss':  'modal',
        //     'onclick': 'closeModal()'
        // })
        const linkCloseAccessibility = document.createElement('img')
        linkCloseAccessibility.src = 'assets/icons/close.svg'
        addMultipleAttributes(linkCloseAccessibility, {
            'aria-label': 'Close',
            'data-dismiss':  'modal',
            'alt': 'fermez le formulaire'
        })


        const closeButton = document.createElement('a')
        addMultipleAttributes(closeButton, {
            'href': '#',
            'class': 'close',
            'aria-label': 'Close',
            'data-dismiss':  'modal',
            'onclick': 'closeFormModal()',
        })


        closeButton.appendChild(linkCloseAccessibility)

        modalHeader.appendChild(titleHeader)
        modalHeader.appendChild(closeButton)
        this.$modalWrapperContent.appendChild(modalHeader)

        const elementForm = document.createElement('form')
        addMultipleAttributes(elementForm, {
            'action': '#',
            'method': 'POST',
        })

        const divFormDataFirstname = document.createElement('div')
        divFormDataFirstname.className = 'formData'

        const elementLabelFirstname = document.createElement('label')
        elementLabelFirstname.setAttribute('for', 'firstname')
        elementLabelFirstname.innerHTML = 'Prénom'

        const elementInputFirstname = document.createElement('input')
        addMultipleAttributes(elementInputFirstname, {
            'id': 'firstname',
            'class': 'form-control',
            'name': 'firstname',
            'type': 'text',
            'aria-describedby': 'firstNameHelp',
        })
        const helpFirstName = document.createElement('small')
        helpFirstName.innerHTML = "Veuillez saisir votre prénom"
        addMultipleAttributes(helpFirstName, {
            'id': 'firstNameHelp',
            'class': 'form-text text-muted'
        })

        divFormDataFirstname.appendChild(elementLabelFirstname)
        divFormDataFirstname.appendChild(elementInputFirstname)
        divFormDataFirstname.appendChild(helpFirstName)
        elementForm.appendChild(divFormDataFirstname)

        const divFormDataLastname = document.createElement('div')
        divFormDataLastname.className = 'formData form-group'

        const elementLabelLastname = document.createElement('label')
        elementLabelLastname.setAttribute('for', 'lastname')
        elementLabelLastname.innerHTML = 'Nom'

        const elementInputLastname = document.createElement('input')
        addMultipleAttributes(elementInputLastname, {
            'id': 'lastname',
            'name': 'lastname',
            'class': 'form-control',
            'type': 'text',
            'aria-describedby': 'lastNameHelp'
        })

        const helpLastName = document.createElement('small')
        helpLastName.innerHTML = "Veuillez saisir votre nom"
        addMultipleAttributes(helpLastName, {
            'id': 'lastNameHelp',
            'class': 'form-text text-muted'
        })

        divFormDataLastname.appendChild(elementLabelLastname)
        divFormDataLastname.appendChild(elementInputLastname)
        divFormDataLastname.appendChild(helpLastName)
        elementForm.appendChild(divFormDataLastname)

        const divFormDataEmail = document.createElement('div')
        divFormDataEmail.className = 'formData'

        const elementLabelEmail = document.createElement('label')
        elementLabelEmail.setAttribute('for', 'email')
        elementLabelEmail.innerHTML = 'Email'

        const elementInputEmail = document.createElement('input')
        addMultipleAttributes(elementInputEmail, {
            'id': 'email',
            'class': 'form-control',
            'name': 'email',
            'type': 'email',
            'aria-describedby': 'emailHelp'
        })

        const helpEmail = document.createElement('small')
        helpEmail.innerHTML = "Veuillez saisir votre email"
        addMultipleAttributes(helpEmail, {
            'id': 'emailHelp',
            'class': 'form-text text-muted'
        })

        divFormDataEmail.appendChild(elementLabelEmail)
        divFormDataEmail.appendChild(elementInputEmail)
        divFormDataEmail.appendChild(helpEmail)
        elementForm.appendChild(divFormDataEmail)

        const divFormDataMessage = document.createElement('div')
        divFormDataMessage.className = 'formData'

        const elementLabelMessage = document.createElement('label')
        elementLabelMessage.setAttribute('for', 'message')
        elementLabelMessage.innerHTML = 'Votre message'

        const elementInputMessage = document.createElement('textarea')
        addMultipleAttributes(elementInputMessage, {
            'id': 'message',
            'class': 'form-control',
            'cols': '40',
            'rows': '5',
            'aria-describedby': 'messageHelp'
        })

        const helpMessage = document.createElement('small')
        helpEmail.innerHTML = "Veuillez saisir votre message"
        addMultipleAttributes(helpEmail, {
            'id': 'messageHelp',
            'class': 'form-text text-muted'
        })

        divFormDataMessage.appendChild(elementLabelMessage)
        divFormDataMessage.appendChild(elementInputMessage)
        divFormDataMessage.appendChild(helpMessage)
        elementForm.appendChild(divFormDataMessage)

        const elementButton = document.createElement('button')
        elementButton.className = 'btn btn-primary submit_button'
        elementButton.innerHTML = 'Envoyer'

        elementForm.appendChild(elementButton)

        this.$modalWrapperContent.appendChild(elementForm)
        this.$modalWrapper.appendChild(this.$modalWrapperContent)
        this.$wrapper.appendChild(this.$modalWrapper)
        this.$modalWrapper.classList.add('modal-on')
        this.$wrapper.appendChild(this.$modalWrapper)
    }

    render() {
            this.createForm()
            this.onControlInput()
            this.onSubmitForm()
    }
}