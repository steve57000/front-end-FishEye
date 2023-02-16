class Form {
    constructor() {
        this.$main = document.getElementById('main')

        this.$wrapper = document.createElement('div')
        addMultipleAttributes(this.$wrapper, {
            'id': 'contact_modal',
            'tabindex': '-1',
            'aria-labelledby': 'contact_button',
            'aria-hidden': 'true'
        })
        this.$wrapper.className = 'modal fade'

        this.$modalWrapperContent = document.createElement('div')
        this.$modalWrapperContent.className = 'modal-content'
        this.$modalWrapperContent.role = 'document'

        this.$main.appendChild(this.$wrapper)

        this.name = document.querySelector('h1').innerHTML
    }

    onControlInput() {
        const regex = {
            firstname : new RegExp(/^[a-zA-Z\d ]{2,50}$/i),
            lastname : new RegExp(/^[a-zA-Z\d ]{2,50}$/i),
            email : new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d1,3}])|(([a-zA-Z\-\d]+\.)+[a-zA-Z]{2,}))$/i),
        }

        const formDataElement = this.$wrapper.querySelectorAll('.formData input')

        for(let i = 0; i < formDataElement.length; i++){
            formDataElement[i].addEventListener('change', e => {
                e.preventDefault()
                const elementTarget = e.target
                const errorMessage = elementTarget.nextElementSibling

                const elementTargetId = elementTarget.id
                const testValue = elementTarget.value

                const regTest = regex[elementTargetId]
                const regTestValue = regTest.test(testValue)

                switch(elementTargetId){
                    case'firstname':
                    case'lastname': {
                        if(!regTestValue) {
                        // || testValue.length < 2 || testValue.length > 250
                            errorMessage.style.display = 'block'
                            if(testValue.length < 2){
                                errorMessage.innerHTML= "Vous devez saisir au moins 2 characters"
                            }
                            else if(testValue.length > 50){
                                errorMessage.innerHTML= "Vous devez saisir moins de 50 characters"
                            }
                        }
                        else{
                            errorMessage.innerHTML= ""
                        }
                        break
                    }
                    case'email': {
                        if(!regTestValue) {
                            errorMessage.style.display = 'block'
                            if(!testValue.match(['@','.']) ) {
                                if (!testValue.match('@')) {
                                    errorMessage.innerHTML = "Il manque  ' @ ' dans votre email"
                                }
                                else {
                                    errorMessage.innerHTML = "Il manque le ' . ' dans votre email"
                                }
                            }
                            else{
                                errorMessage.innerHTML= "La longueur de votre email est invalide, 1 à 250 characters attendus"
                            }
                        }
                        else{
                            errorMessage.innerHTML= ""
                        }
                        break
                    }
                    default: {
                        errorMessage.innerHTML = ''
                        errorMessage.style.display = 'none'
                    }
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
                this.$modalWrapperContent.innerHTML = ''
                this.createFormConfirm()
            }
            else {
                const errorMessage = document.createElement('span')
                errorMessage.innerHTML = "veuillez corrigé"
                this.$wrapper.appendChild = errorMessage
            }
        })
    }

    createFormConfirm() {
        const divConfirm = document.createElement('div')
        divConfirm.className = "form-confirm"

        const elementCloseConfirm = document.createElement('button')
        addMultipleAttributes(elementCloseConfirm, {
            'class': 'modal-close',
            'aria-label': 'Fermez le formulaire',
            'onclick': 'closeContactConfirm()',
            'onkeypress': 'closeContactConfirm()'
        })

        const elementTitle = document.createElement('h2')
        elementTitle.id = 'confirm-title'
        elementTitle.className = 'form-confirm-photographerName'
        elementTitle.innerHTML = [ /* Je recupère le nom et le prénom de l'utilisateur, et je mets en majuscule la première lettre */
            this.userFirstName.charAt(0).toUpperCase() + this.userFirstName.slice(1) + " " +
            this.userLastName.charAt(0).toUpperCase() + this.userLastName.slice(1)
        ]

        const elementDiv = document.createElement('div')
        elementDiv.className = 'form-confirm-content'
        elementDiv.innerHTML = `Votre demande de contact à été transmise`

        const divContactInfo = document.createElement('div')
        divContactInfo.className = 'form-confirm-content'
        divContactInfo.innerHTML =
            `<span class="form-confirm-photographerName">${this.name}</span> prendra contact avec vous sur votre email:`

        const spanPhotographerName = document.createElement('span')
        spanPhotographerName.className = 'form-confirm-info'
        spanPhotographerName.innerHTML = this.userEmail

        const divMessage = document.createElement('div')
        divMessage.className = 'form-confirm-content'
        divMessage.innerHTML = 'Votre message :'

        const spanUserMessage = document.createElement('span')
        spanUserMessage.className = 'form-confirm-info'
        spanUserMessage.innerHTML = this.userMessage

        divConfirm.appendChild(elementTitle)
        divConfirm.appendChild(elementCloseConfirm)
        divConfirm.appendChild(elementDiv)
        divContactInfo.appendChild(spanPhotographerName)
        divConfirm.appendChild(divContactInfo)
        divMessage.appendChild(spanUserMessage)
        divConfirm.appendChild(divMessage)

        return this.$modalWrapperContent.appendChild(divConfirm)

    }

    createForm() {
        const modalHeader = document.createElement('header')
        modalHeader.className = 'modal-header'

        const titleHeader = document.createElement('h2')
        titleHeader.innerHTML = `Contactez-moi <br/>${this.name}`
        addMultipleAttributes(titleHeader, {
            'id': 'modal_label',
            'class': 'modal-title'
        })

        const closeButton = document.createElement('button')
        addMultipleAttributes(closeButton, {
            'class': 'modal-close',
            'aria-label': 'Fermez le formulaire',
            'data-dismiss':  'modal',
            'onclick': 'closeFormModal()',
            'onkeypress': 'closeFormModal()'
        })

        modalHeader.appendChild(titleHeader)
        modalHeader.appendChild(closeButton)
        this.$modalWrapperContent.appendChild(modalHeader)

        const elementForm = document.createElement('form')
        addMultipleAttributes(elementForm, {
            'action': '#',
            'method': 'POST',
            'autocomplete': 'off'
        })

        const divFormDataFirstname = document.createElement('div')
        divFormDataFirstname.className = 'formData'

        const elementLabelFirstname = document.createElement('label')
        addMultipleAttributes(elementLabelFirstname, {
            'for': 'firstname',
            'id': 'label-firstname',
            'aria-label': 'saisir votre prénom',
        })
        elementLabelFirstname.setAttribute('for', 'firstname')

        const elementRequireName = document.createElement('span')
        elementRequireName.innerHTML = '* '
        elementRequireName.className = "form-label-require"

        const elementFirstname = document.createElement('span')
        elementFirstname.innerHTML = 'Prénom'
        elementFirstname.className = 'form-label-title'

        const elementInputFirstname = document.createElement('input')
        addMultipleAttributes(elementInputFirstname, {
            'id': 'firstname',
            'class': 'form-control',
            'name': 'firstname',
            'type': 'text',
            'maxlength': 50,
            'minlength': 2,
            'aria-labelledby': 'label-firstname',
            'required': 'required'
        })

        const helpFirstName = document.createElement('small')
        addMultipleAttributes(helpFirstName, {
            'id': 'firstNameHelp',
            'class': 'form-text text-muted'
        })

        elementLabelFirstname.appendChild(elementRequireName)
        elementLabelFirstname.appendChild(elementFirstname)
        divFormDataFirstname.appendChild(elementLabelFirstname)
        divFormDataFirstname.appendChild(elementInputFirstname)
        divFormDataFirstname.appendChild(helpFirstName)
        elementForm.appendChild(divFormDataFirstname)

        const divFormDataLastname = document.createElement('div')
        divFormDataLastname.className = 'formData'

        const elementLabelLastname = document.createElement('label')
        addMultipleAttributes(elementLabelLastname, {
            'for': 'lastname',
            'id': 'label-lastname',
            'aria-label': 'saisir votre nom'
        })
        elementLabelLastname.setAttribute('for', 'lastname')

        const elementRequireLastName = document.createElement('span')
        elementRequireLastName.innerHTML = '* '
        elementRequireLastName.className = "form-label-require"

        const elementLastname = document.createElement('span')
        elementLastname.className = 'form-label-title'
        elementLastname.innerHTML = 'Nom'

        const elementInputLastname = document.createElement('input')
        addMultipleAttributes(elementInputLastname, {
            'id': 'lastname',
            'name': 'lastname',
            'class': 'form-control',
            'type': 'text',
            'maxlength': 50,
            'minlength': 2,
            'aria-describedby': 'lastNameHelp',
            'required': 'required'
        })

        const helpLastName = document.createElement('small')
        addMultipleAttributes(helpLastName, {
            'id': 'lastNameHelp',
            'class': 'form-text text-muted'
        })

        elementLabelLastname.appendChild(elementRequireLastName)
        elementLabelLastname.appendChild(elementLastname)
        divFormDataLastname.appendChild(elementLabelLastname)
        divFormDataLastname.appendChild(elementInputLastname)
        divFormDataLastname.appendChild(helpLastName)
        elementForm.appendChild(divFormDataLastname)

        const divFormDataEmail = document.createElement('div')
        divFormDataEmail.className = 'formData'

        const elementLabelEmail = document.createElement('label')
        addMultipleAttributes(elementLabelEmail, {
            'for': 'email',
            'id': 'label-email',
            'aria-label': 'saisir votre adresse de courier électronique'
        })

        const elementRequireEmail = document.createElement('span')
        elementRequireEmail.innerHTML = '* '
        elementRequireEmail.className = "form-label-require"

        const elementEmail = document.createElement('span')
        elementEmail.innerHTML = 'Email'
        elementEmail.className = 'form-label-title'

        const elementInputEmail = document.createElement('input')
        addMultipleAttributes(elementInputEmail, {
            'id': 'email',
            'class': 'form-control',
            'name': 'email',
            'type': 'email',
            'maxlength': 100,
            'placeholder': 'nom@example.com',
            'aria-labelledby': 'label-email',
            'autocomplete': 'on',
            'required': 'required'
        })

        const helpEmail = document.createElement('small')
        addMultipleAttributes(helpEmail, {
            'id': 'emailHelp',
            'class': 'form-text text-muted'
        })

        elementLabelEmail.appendChild(elementRequireEmail)
        elementLabelEmail.appendChild(elementEmail)
        divFormDataEmail.appendChild(elementLabelEmail)
        divFormDataEmail.appendChild(elementInputEmail)
        divFormDataEmail.appendChild(helpEmail)
        elementForm.appendChild(divFormDataEmail)

        const divFormDataMessage = document.createElement('div')
        divFormDataMessage.className = 'formData'

        const elementLabelMessage = document.createElement('label')
        addMultipleAttributes(elementLabelMessage, {
            'for': 'message',
            'id': 'label-message',
            'aria-label': 'saisir votre message'
        })
        elementLabelMessage.setAttribute('for', 'message')

        const elementRequireMessage = document.createElement('span')
        elementRequireMessage.innerHTML = '* '
        elementRequireMessage.className = "form-label-require"

        const elementMessage = document.createElement('span')
        elementMessage.innerHTML = 'Votre message'
        elementMessage.className = 'form-label-title'

        const elementInputMessage = document.createElement('textarea')
        addMultipleAttributes(elementInputMessage, {
            'id': 'message',
            'class': 'form-control',
            'cols': 5,
            'rows': 5,
            'maxlength': 250,
            'required': 'required',
            'aria-labelledby': 'label-message'
        })

        const helpMessage = document.createElement('small')
        addMultipleAttributes(helpMessage, {
            'id': 'messageHelp',
            'class': 'form-text text-muted'
        })

        elementLabelMessage.appendChild(elementRequireMessage)
        elementLabelMessage.appendChild(elementMessage)
        divFormDataMessage.appendChild(elementLabelMessage)
        divFormDataMessage.appendChild(elementInputMessage)
        divFormDataMessage.appendChild(helpMessage)
        elementForm.appendChild(divFormDataMessage)

        const elementButton = document.createElement('button')
        elementButton.className = 'btn btn-primary submit_button'
        elementButton.innerHTML = 'Envoyer'

        elementForm.appendChild(elementButton)

        this.$modalWrapperContent.appendChild(elementForm)
        this.$wrapper.appendChild(this.$modalWrapperContent)

    }

    render() {
            this.createForm()
            this.onControlInput()
            this.onSubmitForm()
    }
}