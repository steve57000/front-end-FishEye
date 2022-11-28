class PhotographerMediaCard {
    constructor(mediaPhotographer) {
        this._mediaCard = mediaPhotographer
    }


    createPhotographerMedia() {
        function addMultipleAttributes(el, attrs) {
            for (let key in attrs) {
                el.setAttribute(key, attrs[key]);
            }
        }

        const $elementFigure = document.createElement('figure')
        $elementFigure.className ='photograph-media-card'

        const elementTitle = document.createElement('p')
        elementTitle.textContent = `${this._mediaCard.title}`

        let elementMedia;
        if(this._mediaCard.media.attrType === "mp4") {
            elementMedia = document.createElement('video')
            elementMedia.setAttribute('controls', 'true')
            const elementSource = document.createElement('source')
            addMultipleAttributes(elementSource, {
                'src': this._mediaCard.media.createLink,
                'type': 'video/mp4'
            })

            const elementMediaDownload = document.createElement('a')
            elementMediaDownload.href = this._mediaCard.media.createLink
            elementMediaDownload.textContent = "Télécharger mp4"

            elementMedia.appendChild(elementSource)
            elementMedia.appendChild(elementMediaDownload)
        }
        else if(this._mediaCard.media.attrType === "jpg") {
            elementMedia = document.createElement('img')
            addMultipleAttributes(elementMedia, {
                'src': this._mediaCard.media.createLink,
                'href': this._mediaCard.media.createLink,
                'type': 'image/jpg'
            })
        }
        else {
            console.log('Il semble avoir un problème avec le type de média: ' + this._mediaCard.media.attrType)
        }
        addMultipleAttributes(elementMedia, {
            'width': 300,
            'height': 300
        })

        $elementFigure.appendChild(elementMedia)
        $elementFigure.appendChild(elementTitle)

        return $elementFigure
    }
}