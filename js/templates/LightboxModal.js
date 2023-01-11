class LightboxModal {
    constructor(mediaPhotographer) {
        this._mediaPhotographer = mediaPhotographer;

        this.$wrapperLightbox = document.querySelector('.modal-content-slides')
        this.selectAllMedia = document.querySelectorAll('.photograph-media-card')

        this.numberSlide = 1

    }

    createLightbox() {

        const lightboxIframe = document.createElement('figure')
        lightboxIframe.className = 'mySlides'
        addMultipleAttributes( lightboxIframe, {
            'role' : 'group',
            'aria-roledescription' : 'slide'
        })

        const elementFigcaption = document.createElement('figcaption')
        elementFigcaption.id = 'caption-container'

        const elementTitle = document.createElement('p')
        elementTitle.textContent = `${this._mediaPhotographer.title}`
        elementTitle.id = 'caption'

        elementFigcaption.appendChild(elementTitle)

        for(let i = 0; i < this.selectAllMedia.length; i++) {
            // console.log(this.$selectAllMedia[i])
            const mediaElement = this.selectAllMedia[i].childNodes[0]
            mediaElement.setAttribute('onclick' , `openModal(); currentSlide(${this.numberSlide})`)
            this.numberSlide += 1
        }

        if(this._mediaPhotographer.media.attrType === "jpg") {
            const elementMedia = document.createElement('img')
            addMultipleAttributes(elementMedia, {
                'width': '100%',
                'height': '800px',
                'src': this._mediaPhotographer.media.createLink,
                'style': 'object-fit:scale-down'
            })
            lightboxIframe.appendChild(elementMedia)
            lightboxIframe.appendChild(elementFigcaption)
        }
        else if(this._mediaPhotographer.media.attrType === "mp4") {
            if(this._mediaPhotographer.media.attrType === "mp4") {
                const elementMedia = document.createElement('video')
                elementMedia.setAttribute('controls', 'true')
                addMultipleAttributes(elementMedia, {
                    'style': 'object-fit:cover',
                    'width': '100%'
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



        // for(let i = 0; i < this.$selectAllMedia.length; i++) {
        //     this.numberSlide += 1
        //     srcMedia = this.$selectAllMedia[i].currentSrc
        //     titleMedia = this.$selectAllMedia[i].nextElementSibling.childNodes[0]
        //
        //     this.$selectAllMedia[i].setAttribute('onclick' , `openModal(); currentSlide(${this.numberSlide})`)
        //
        //     const lightboxIframe = document.createElement('figure')
        //     lightboxIframe.className = 'mySlides'
        //
        //     const elementImg = document.createElement('img')
        //     elementImg.src = this._mediaPhotographer.media.createLink
        //     addMultipleAttributes(elementImg, {
        //         'width': '100%'
        //     })
        //
        //     const elementFigcaption = document.createElement('figcaption')
        //     elementFigcaption.id = 'caption-container'
        //
        //     const elementTitle = document.createElement('p')
        //     elementTitle.innerText = titleMedia.innerHTML
        //     elementTitle.id = 'caption'
        //
        //     const elementDivMediaDemo = document.createElement('div')
        //     elementDivMediaDemo.className = 'column'
        //
        //     const elementImgDemo = document.createElement('img')
        //
        //     addMultipleAttributes(elementImgDemo, {
        //         'width': '100%',
        //         'onclick' : `currentSlide(${this.numberSlide})`,
        //         'src' : this._mediaPhotographer.media.createLink
        //     })
        //
        //
        //
        //     lightboxIframe.appendChild(elementImg)
        //     lightboxIframe.appendChild(elementFigcaption)
        //
        //     elementFigcaption.appendChild(elementTitle)
        //
        //     this.$wrapperLightboxDiv.appendChild(lightboxIframe)
        //
        //
        //     elementImgDemo.className = 'demo cursor'
        //     elementDivMediaDemo.appendChild(elementImgDemo)
        //     containerSlides.appendChild(elementDivMediaDemo)
        // }

    }

}

