class LightboxModal {
    constructor(mediaPhotographer) {
        this._mediaPhotographer = mediaPhotographer;
        this.$wrapperLightbox = document.querySelector('.modal-content-slides')
    }

    createLightboxDom() {

        const lightboxIframe = document.createElement('figure')
        lightboxIframe.className = 'mySlides'

        const elementFigcaption = document.createElement('figcaption')
        elementFigcaption.className = 'caption-container'

        const elementTitle = document.createElement('h2')
        elementTitle.textContent = `${this._mediaPhotographer.title}`
        elementTitle.className = 'caption'

        elementFigcaption.appendChild(elementTitle)

        if(this._mediaPhotographer.media.attrType === "webp") {
            const elementMedia = document.createElement('img')
            addMultipleAttributes(elementMedia, {
                'width': '800px',
                'height': '600px',
                'type': 'image/webp',
                'src': this._mediaPhotographer.media.createLinkMedium,
                'alt': this._mediaPhotographer.title
            })
            lightboxIframe.appendChild(elementMedia)
            lightboxIframe.appendChild(elementFigcaption)
        }
        else if(this._mediaPhotographer.media.attrType === "mp4") {
            if(this._mediaPhotographer.media.attrType === "mp4") {
                const elementMedia = document.createElement('video')
                addMultipleAttributes(elementMedia, {
                    'width': '800px',
                    'height': '600px',
                    'type': 'video/mp4',
                    'controls': 'true'
                })
                const elementSource = document.createElement('source')
                addMultipleAttributes(elementSource, {
                    'src': this._mediaPhotographer.media.createLink,
                    'type': 'video/mp4'
                })

                const elementMediaDownload = document.createElement('a')
                elementMediaDownload.href = this._mediaPhotographer.media.createLink
                elementMediaDownload.textContent = "Télécharger mp4"

                elementMedia.appendChild(elementSource)
                elementMedia.appendChild(elementMediaDownload)
                lightboxIframe.appendChild(elementMedia)
                lightboxIframe.appendChild(elementFigcaption)
            }
        }
        return this.$wrapperLightbox.appendChild(lightboxIframe)
    }

    createLightbox() {
        const selectAllMedia = document.querySelectorAll('.photograph_media_gallery')
        let numberSlide = 1

        selectAllMedia.forEach( mediaElement => {
            mediaElement.setAttribute('onclick' , `openModal(); currentSlide(${numberSlide})`)
            mediaElement.setAttribute('onkeypress' , `openModal(); currentSlide(${numberSlide})`)

            const elementImg = mediaElement.childNodes[0]
            elementImg.setAttribute('aria-labelledby', `title-image${numberSlide}`)

            const titleMedia = mediaElement.parentElement.childNodes[1].childNodes[0]
            titleMedia.id = `title-image${numberSlide}`

            numberSlide += 1
        })
        return this.createLightboxDom()
    }

}
