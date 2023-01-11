class App {
    constructor() {
        this.$main = document.querySelector('#main')
        this.$body = document.querySelector('body')

        this._photographersApi = new PhotographerApi('/data/photographers.json')

        this._params = new URL(document.location).searchParams
        this._idProfil = this._params.get('id')

        this.FullMedias = []
        this.FullPhotographers = []
        this.PhotographerData = []
    }

    async CreateDomElement() {
        const sectionPhotographer = document.createElement('div')
        sectionPhotographer.id = "photographer_section"

        const filterFormWrapper = document.createElement('div')
        filterFormWrapper.id = "filter-form-wrapper"

        const photographerMedia = document.createElement('div')
        photographerMedia.className = "photographer_media"

        const footerPhotographerMedia = document.createElement('div')
        footerPhotographerMedia.className = "footer-photographer-page"

        const createLightboxDiv = document.createElement('div')
        createLightboxDiv.setAttribute('id', 'myLightbox')
        createLightboxDiv.classList.add('modal-lightbox')
        createLightboxDiv.setAttribute('tabindex', '0')

        const linkClose = document.createElement('button')
        addMultipleAttributes( linkClose, {
            'type' : 'button',
            'onclick' : 'closeModal()',
            'aria-label' : 'Close slide',
            'aria-controls' : 'myCarousel',
             'alt' : 'Close',
            'tabindex' : '0'
        })

        // const spanCloseElement = document.createElement('span')
        // spanCloseElement.className = 'close cursor'
        linkClose.className = 'close cursor'
        linkClose.innerHTML = '\&times'

        const previousButton = document.createElement('button')
        addMultipleAttributes(previousButton, {
            'type' : 'button',
            'onclick' : `getSlides(-1)`,
            'aria-label' : 'Previous slide',
            'aria-controls' : 'myCarousel',
            'tabindex' : '0'
        })
        previousButton.className = 'previous-button'
        previousButton.innerHTML = '\&#10094'

        const nextButton = document.createElement('button')
        addMultipleAttributes(nextButton, {
            'type' : 'button',
            'onclick' : `getSlides(1)`,
            'aria-label' : 'Next slide',
            'aria-controls' : 'myCarousel',
            'tabindex' : '0'
        })
        nextButton.className = 'next-button'
        nextButton.innerHTML = '\&#10095'

        const wrapperLightboxDiv = document.createElement('div')
        wrapperLightboxDiv.classList.add('modal-content-slides')
        wrapperLightboxDiv.id = 'myCarousel'

        createLightboxDiv.appendChild(linkClose)
        createLightboxDiv.appendChild(previousButton)
        createLightboxDiv.appendChild(nextButton)
        createLightboxDiv.appendChild(wrapperLightboxDiv)

        this.$main.appendChild(sectionPhotographer)
        this.$main.appendChild(filterFormWrapper)
        this.$main.appendChild(photographerMedia)
        this.$main.appendChild(footerPhotographerMedia)
        this.$body.childNodes[3].appendChild(createLightboxDiv)
    }

    async fetchAllData() {
        const allData = await this._photographersApi.getPhotographers()
        const photographersData = allData.photographers
        const mediaData = allData.media

        // J'ajoute tous les photographes et medias dans un tableau séparé
        // et je décharge la création de la data, selon le type, dans mon factory
        this.FullPhotographers = photographersData.map(photographer => new Photographer(photographer, 'allPhotographers'))
        this.FullMedias = mediaData.map(mediaPhotographer => new PhotographerMedia(mediaPhotographer, 'mediaPhotographers'))
    }

    async fetchOnlyPhotographerData() {
        // Selon l'id du photographe
        // je filtre le tableau contenant tout les medias de chaque photographe
        const findPhotographer = this.FullPhotographers.find(photographer => JSON.stringify(photographer.id) === this._idProfil)
        const filterMedia = this.FullMedias.filter(mediaPhotographer => JSON.stringify(mediaPhotographer.photographerId) === this._idProfil)

        // et je crée un tableau de données contenant le photographe rechercher et tous les médias correspondant
        this.PhotographerData = {
            'photographer': findPhotographer,
            'medias': filterMedia
        }
    }

    // Création de tous les photographes
    async photographersHomePage() {
        const sectionPhotographer = document.getElementById('photographer_section')
        this.FullPhotographers.forEach(photographer => {
            const Template = new PhotographerCard(photographer)
            sectionPhotographer.appendChild(
                Template.createPhotographerCard()
            )
        })
    }

    // Création du profil du photographe récupérer dans mon tableau
    async getPhotographerPage() {
        const sectionPhotographer = document.getElementById('photographer_section')
            const Template = new PhotographerCardPageProfil(this.PhotographerData.photographer)
            sectionPhotographer.appendChild(
                Template.modifyPhotographerCard()
            )
    }

    // Création des medias du photographe
    async photographerPageMedia() {
        const sectionPhotographer = document.querySelector('.photographer_media' )
        const Filter = new FilterForm( this.PhotographerData.medias )
        Filter.render()
        this.PhotographerData.medias.forEach( mediaPhotographer => {
            const Template = new PhotographerMediaCard( mediaPhotographer )
            sectionPhotographer.appendChild(
                Template.createPhotographerMedia()
            )
        })
    }

    async countTotalLikes() {
        const spanTotalLikes = document.querySelector('#totalLikes' )
        const getLikes = document.querySelectorAll('.like-card' )
        let totalLikes = 0
        for (let i = 0; i < getLikes.length; i++) {
            totalLikes += Number( getLikes[i].textContent )
        }
        addMultipleAttributes( spanTotalLikes,{
            'data-count-to': totalLikes,
            'data-duration': 3500
        })
        return spanTotalLikes.innerHTML = new Intl.NumberFormat().format( totalLikes )
    }

    async modalLightbox() {
        const sectionLightbox = document.querySelector('.modal-content-slides' )
        sectionLightbox.setAttribute('tabindex', '-1')

        this.PhotographerData.medias.forEach( mediaPhotographer => {
            const Template = new LightboxModal( mediaPhotographer )
            sectionLightbox.appendChild(
                Template.createLightbox()
            )
        })

    }


    async main() {
        await this.CreateDomElement()
        await this.fetchAllData()

        if(this._idProfil !== null) {
            await this.fetchOnlyPhotographerData()
            await this.getPhotographerPage()
            await this.photographerPageMedia()
            await this.countTotalLikes()
            animateNumbersLikes()
            await this.modalLightbox()

            const ModalForm = new Form()
            ModalForm.render()

        }
        else {
            await this.photographersHomePage()
        }
    }
}

const app = new App()
app.main()