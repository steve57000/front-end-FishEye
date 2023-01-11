class FilterForm {
    constructor(Medias) {
        this.Medias = Medias;

        this.$filterFormWrapper = document.querySelector('#filter-form-wrapper')
        addMultipleAttributes(this.$filterFormWrapper, {
            'role': 'filter',
            'aria-labelledby': 'filter_label',
            'aria-hidden': 'true'
        })
        this.$mediaWrapper = document.querySelector('.photographer_media')

    }

    async filterMedias(option) {
        this.clearMediasWrapper()

        const AdaptedFilterLib = new FilterMediaAdapter(this.Medias, option)
        const FilteredMedias = await AdaptedFilterLib.filterByOption()

        FilteredMedias.forEach(Medias => {
            const Template = new PhotographerMediaCard(Medias)
            this.$mediaWrapper.appendChild(Template.createPhotographerMedia())
        })

    }

    async onChangeFilter() {
        const selectElement = this.$filterFormWrapper
        .querySelectorAll('.select-items')
        for(let i = 0; i < selectElement.length; i++){
            selectElement[i].addEventListener('click', e => {
                const option = e.target.getAttribute('value')
                this.filterMedias(option)
            })
        }
    }

    clearMediasWrapper() {
        this.$mediaWrapper.innerHTML = ""
    }

    render() {
        const choiceOption = [
            {
                'value' : 'popularity',
                'texte': 'Popularité'
            },
            {
                'value' : 'date',
                'texte': 'Date'
            },
            {
                'value' : 'title',
                'texte': 'Titre'
            }]


        const elementLabel = document.createElement('label')
        addMultipleAttributes(elementLabel, {
            'for': 'filter-select',
            'id': 'filter_label'
        })
        elementLabel.textContent = 'Trier par: '

        const elementInput = document.createElement('button')
        addMultipleAttributes(elementInput, {
            'tabindex': 0,
            'id' : 'filter-select',
            'data-toggle': 'dropdown-content',
            'data-target': '#myDropdown',
            'onclick' : 'toggleShow(this)'
        })

        const elementDivDropdown = document.createElement('div')
        elementDivDropdown.className = 'dropdown-content'
        elementDivDropdown.id = 'myDropdown'
        addMultipleAttributes(elementDivDropdown, {
            'tabindex': '-1',
            'role': 'filter',
            'aria-labelledby': 'filter_label',
            'aria-hidden': 'true'
        })

        for (let i = 0; i < choiceOption.length; i++) {
            elementInput.innerHTML = choiceOption[0].texte
            const elementLink = document.createElement('button')
            elementLink.setAttribute('value', choiceOption[i].value)
            elementLink.innerHTML = choiceOption[i].texte
            addMultipleAttributes(elementLink, {
                'class': 'select-items',
                'tabindex': 0,
                'data-dismiss': 'dropdown-content',
                'onclick': 'changeInputValue(this)'
            })
            elementDivDropdown.appendChild(elementLink)
        }

        this.$filterFormWrapper.appendChild(elementLabel)
        this.$filterFormWrapper.appendChild(elementInput)

        this.$filterFormWrapper.appendChild(elementDivDropdown)

        this.onChangeFilter()
    }
}


