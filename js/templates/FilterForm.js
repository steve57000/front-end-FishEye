class FilterForm {
    constructor(Medias) {
        this.Medias = Medias;
        this.$mediaWrapper = document.querySelector('.photographer_media')

        this.$sectionMedia = document.querySelector('#section-medias')
        this.$sectionLightbox = document.querySelector('.modal-content-slides' )

    }

    async filterMedias(option) {
        this.clearMediasWrapper()

        const AdaptedFilterLib = new FilterMediaAdapter(this.Medias, option)
        const FilteredMedias = await AdaptedFilterLib.filterByOption()

        for (const Medias of FilteredMedias) {
            const Template =  new  PhotographerMediaCard( Medias)
            this.$mediaWrapper.appendChild(await Template.createPhotographerMedia())
        }
        await this.modalLightbox()
    }

    async modalLightbox() {
        this.Medias.forEach( mediaPhotographer => {
            const Template = new LightboxModal( mediaPhotographer )
            this.$sectionLightbox.appendChild(
                Template.createLightbox()
            )
        })
    }

    clearMediasWrapper() {
        this.$mediaWrapper.innerHTML = ""
        this.$sectionLightbox.innerHTML = ""
    }

    async buttonFilterMediaListener(){
        const buttonWrapper = document.querySelector('#filter-select')
        buttonWrapper.addEventListener('click', (handleBtnClick))
        buttonWrapper.addEventListener('keydown', (handleBtnKeyDown))
    }

    async onChangeFilter() {
        const buttonValue = document.querySelector('#filter-select')
        const elementRef = this.$sectionMedia.querySelectorAll('.select-items')

        elementRef.forEach(value => {
            value.addEventListener('click', event => {
                const option = event.target.getAttribute('value')
                buttonValue.innerHTML = ''
                buttonValue.innerHTML = event.target.innerHTML
                buttonValue.setAttribute('value', option)
                this.filterMedias(option)
            })

            value.addEventListener('keydown', event => {
                const targetNextElement = event.target.nextElementSibling
                const targetPreviousElement =  event.target.previousElementSibling
                const option = event.target.getAttribute('value')
                switch(event.code){
                    case 'Enter':
                    case 'Space':
                        event.preventDefault()
                        buttonValue.innerHTML = ''
                        buttonValue.innerHTML = event.target.innerHTML
                        buttonValue.setAttribute('value', option)
                        this.filterMedias(option)
                        break

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
            })
        })
    }

    async createSectionFilter(){
        const choiceOption = [
            {
                'value': 'popularity',
                'texte': 'Popularité'
            },
            {
                'value': 'date',
                'texte': 'Date'
            },
            {
                'value': 'title',
                'texte': 'Titre'
            }]

        const filterFormWrapper = document.createElement('aside')
        filterFormWrapper.id = "filter-form-wrapper"

        const elementLabel = document.createElement('h3')
        addMultipleAttributes(elementLabel, {
            'aria-labelledby': 'filter-select',
            'id': 'filter_label'
        })
        elementLabel.textContent = 'Trier par: '

        const containerFilter = document.createElement('div')
        containerFilter.id = 'container-filter'

        const elementInput = document.createElement('button')
        addMultipleAttributes(elementInput, {
            'id': 'filter-select',
            'aria-label': 'Filtrer les médias par: ',
            'aria-expanded': 'false',
            'aria-haspopup': 'false',
            'tabindex': 0
        })

        const elementDivDropdown = document.createElement('ol')
        elementDivDropdown.className = 'dropdown-content'
        elementDivDropdown.id = 'myDropdown'
        addMultipleAttributes(elementDivDropdown, {
            'tabindex': '-1',
        })

        for (let i = 0; i < choiceOption.length; i++) {
            const elementList = document.createElement('li')
            elementList.setAttribute('value', choiceOption[i].value)
            elementList.innerHTML = choiceOption[i].texte
            addMultipleAttributes(elementList, {
                'class': 'select-items',
                'id': choiceOption[i].value,
                'tabindex': '0',
                'aria-label': 'trier medias par ' + choiceOption[i].texte
            })
            elementInput.innerHTML = 'Veuillez choisir'
            elementDivDropdown.appendChild(elementList)
        }

        filterFormWrapper.appendChild(elementLabel)
        containerFilter.appendChild(elementInput)
        containerFilter.appendChild(elementDivDropdown)
        filterFormWrapper.appendChild(containerFilter)

        this.$sectionMedia.insertBefore(filterFormWrapper, this.$sectionMedia.firstChild)
    }

    async render() {
        await this.createSectionFilter()
        await this.onChangeFilter()
        await this.buttonFilterMediaListener()
    }
}