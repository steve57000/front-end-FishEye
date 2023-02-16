class PhotographerMediaCard {
    constructor(mediaPhotographer) {
        this._mediaPhotographer = mediaPhotographer
        this.$wrapper = document.querySelector('.photographer_media')

    }

    async createPhotographerMedia(){
        const elementFigure = document.createElement('figure')
        elementFigure.style.animation = 'anim-modal-open 0.5s ease-in'
        const elementFigcaption = document.createElement('figcaption')

        const elementTxt = document.createElement('p')
        elementTxt.textContent = `${this._mediaPhotographer.title}`
        elementTxt.className = 'titles-images'

        const elementSpan = document.createElement('span')
        elementSpan.className = "like-card counter"
        elementSpan.textContent = `${this._mediaPhotographer.likes}`

        const elementLinkLike = document.createElement('button')
        addMultipleAttributes(elementLinkLike, {
            'type': 'button',
            'aria-label': 'dislikes',
            'onclick': 'addTotalLikes(this)'
        })
        elementLinkLike.className = "like-card"
        elementLinkLike.style.backgroundColor = 'transparent'
        elementLinkLike.style.border = 'none'


        const elementI = document.createElement('strong')
        addMultipleAttributes(elementI, {
            'class': 'fa fa-heart'
        })
        elementI.style.color = '#6e6e6e'

        let linkMedia;
        if (this._mediaPhotographer.media.attrType === "mp4") {
            linkMedia = document.createElement('video')
            linkMedia.setAttribute('controls', 'true')
            addMultipleAttributes(linkMedia, {
                'height': '250px',
                'object-fit': 'contain',
                'class': 'photograph_media_gallery'
            })
            const elementSource = document.createElement('source')
            addMultipleAttributes(elementSource, {
                'src': this._mediaPhotographer.media.createLink,
                'type': 'video/mp4',
                'target': '_self'
            })
            linkMedia.appendChild(elementSource)

        }
        else if (this._mediaPhotographer.media.attrType === "webp") {
            linkMedia = document.createElement('a')
            linkMedia.href = '#myCarousel'
            linkMedia.target = "_self"
            linkMedia.setAttribute('class', 'photograph_media_gallery')

            const elementMedia = document.createElement('img')
            addMultipleAttributes(elementMedia, {
                'src': this._mediaPhotographer.media.createLinkLow,
                'type': 'image/webp',
                'width': '800px',
                'height': '600px',
                'alt': `${this._mediaPhotographer.title}`
            })
            linkMedia.appendChild(elementMedia)
        }
        else {
            throw new Error('Le type de média: ' + this._mediaPhotographer.media.attrType + ', n\'est pas accepter!!')
        }

        elementFigcaption.appendChild(elementTxt)
        elementFigcaption.appendChild(elementSpan)
        elementLinkLike.appendChild(elementI)
        elementFigcaption.appendChild(elementLinkLike)

        elementFigure.appendChild(linkMedia)
        elementFigure.appendChild(elementFigcaption)

        return this.$wrapper.appendChild(elementFigure)
    }

}