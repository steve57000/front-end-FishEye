class PhotographerMediaCard {
    constructor(mediaPhotographer) {
        this._mediaPhotographer = mediaPhotographer
        this.$wrapper = document.createElement('figure')
        this.$wrapper.classList.add('photograph-media-card')
    }


    createPhotographerMedia() {

        const elementFigcaption = document.createElement('figcaption')

        const elementTxt = document.createElement('p')
        elementTxt.textContent = `${this._mediaPhotographer.title}`

        const elementSpan = document.createElement('span')
        elementSpan.className = "like-card counter"
        elementSpan.textContent = `${this._mediaPhotographer.likes}`

        const elementLinkLike = document.createElement('a')
        elementLinkLike.href = "#"
        elementLinkLike.setAttribute('onclick', 'addTotalLikes(this)')

        const elementI = document.createElement( 'i' )
        addMultipleAttributes(elementI, {
            'class' : 'fa fa-heart'
        })
        elementI.style.color = '#6e6e6e'

        let linkMedia;

        if(this._mediaPhotographer.media.attrType === "mp4") {
            linkMedia = document.createElement('a')
            linkMedia.href = '#'
            linkMedia.setAttribute('onclick' , `openModal()`)
            const elementMedia = document.createElement('video')
            elementMedia.setAttribute('controls', 'true')
            addMultipleAttributes(elementMedia, {
                'style': 'width:300px; height:250px; object-fit:cover;'
            })
            const elementSource = document.createElement('source')
            addMultipleAttributes(elementSource, {
                'src': this._mediaPhotographer.media.createLink,
                'type': 'video/mp4',
                'style': 'width:300px; height:250px;'
            })

            const elementMediaDownload = document.createElement('a')
            elementMediaDownload.href = this._mediaPhotographer.media.createLink
            elementMediaDownload.textContent = "Télécharger mp4"

            linkMedia.appendChild(elementSource)
            linkMedia.appendChild(elementMediaDownload)
            linkMedia.appendChild(elementMedia)
        }
        else if(this._mediaPhotographer.media.attrType === "jpg") {
            linkMedia = document.createElement('a')
            linkMedia.href = '#'
            linkMedia.setAttribute('onclick' , `openModal()`)
            const elementMedia = document.createElement('img')
            addMultipleAttributes(elementMedia, {
                'src': this._mediaPhotographer.media.createLink,
                'type': 'image/jpg',
                'style': 'width:300px; height:250px;'
            })
            linkMedia.appendChild(elementMedia)

        }
        else {
            throw new Error('Le type de média: ' + this._mediaPhotographer.media.attrType + ', n\'est pas accepter!!')
        }
        linkMedia.setAttribute('tabindex', 0)
        elementFigcaption.appendChild(elementTxt)
        elementFigcaption.appendChild(elementSpan)
        elementLinkLike.appendChild(elementI)
        elementFigcaption.appendChild(elementLinkLike)

        this.$wrapper.appendChild(linkMedia)
        this.$wrapper.appendChild(elementFigcaption)

        return this.$wrapper
    }


}