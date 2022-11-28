class App {
    constructor() {
        this.$sectionPhotographer = document.querySelector('.photographer_section')
        this.$sectionPhotographerMedia = document.querySelector('.photographer_media')

        this._photographersApi = new PhotographerApi('/data/photographers.json')

        this._params = new URL(document.location).searchParams
        this._idProfil = this._params.get('id')

        this.FullMedias = []
        this.FullPhotographers = []
        this.PhotographerData = []
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
        this.FullPhotographers.forEach(photographer => {
            const Template = new PhotographerCard(photographer)
            this.$sectionPhotographer.appendChild(
                Template.createPhotographerCard()
            )
        })
    }

    // Création du profil du photographe récupérer dans mon tableau
    async getPhotographerPage() {
            const Template = new PhotographerCardPageProfil(this.PhotographerData.photographer)
            this.$sectionPhotographer.appendChild(
                Template.modifyPhotographerCard()
            )
    }

    // Création des medias du photographe
    async photographerPageMedia() {
        this.PhotographerData.medias.forEach( mediaPhotoPhotograph => {
                const Template = new PhotographerMediaCard(mediaPhotoPhotograph)
                this.$sectionPhotographerMedia.appendChild(
                    Template.createPhotographerMedia()
                )
        })
    }

    async main() {
        await this.fetchAllData()

        if(this._idProfil !== null) {
            await this.fetchOnlyPhotographerData()
            await this.getPhotographerPage()
            await this.photographerPageMedia()
        }
        else {
            await this.photographersHomePage()
        }
    }
}

const app = new App()
app.main()