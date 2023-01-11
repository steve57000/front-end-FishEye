class PhotographerCard {
    constructor(photographer) {
        this._photographer = photographer;
    }

    createPhotographerCard() {

        const $elementArticle = document.createElement( 'article' )
        $elementArticle.classList.add('photographer_card')

        const elementFigure = document.createElement( 'figure')
        elementFigure.className = 'figure-photograph-home'

        const elementLink = document.createElement( 'a')
        addMultipleAttributes(elementLink, {
            'href': `?id=${this._photographer.id}`,
            'aria-label': 'Ouvrir la page du photographe',
            // 'tabindex': "3",
            'title': `Voir le profil de ${this._photographer.name}`
        })

        const elementImage = document.createElement( 'img' )
        elementImage.src = `${this._photographer.thumbnail}`
        elementImage.alt = `Photo de profil du photographe ${this._photographer.name}`
        elementImage.className = 'object-position'
        addMultipleAttributes(elementImage,{
            'width': '200',
            'height': '200'
        })

        const elementName = document.createElement('h2')
        elementName.className = 'photographer_card_name'
        elementName.innerHTML = `${this._photographer.name}`

        const elementFigcaption = document.createElement('figcaption')
        elementFigcaption.className = 'photographer_card_info'
        // elementFigcaption.setAttribute('tabindex', '3')

        const elementCity = document.createElement('p')
        elementCity.className = 'photographer_card_city'
        elementCity.innerHTML = `${this._photographer._city}, ${this._photographer._country}`

        const elementTagline = document.createElement('p')
        elementTagline.className = 'photographer_card_tagline'
        elementTagline.innerHTML = `${this._photographer._tagline}`

        const elementPrice = document.createElement('p')
        elementPrice.className = 'photographer_card_price'
        elementPrice.innerHTML = `${this._photographer._price}\u20AC/Jour `

        elementLink.appendChild(elementImage)
        elementLink.appendChild(elementName)

        elementFigcaption.appendChild(elementCity)
        elementFigcaption.appendChild(elementTagline)
        elementFigcaption.appendChild(elementPrice)

        elementFigure.appendChild(elementLink)
        elementFigure.appendChild(elementFigcaption)

        $elementArticle.appendChild(elementFigure)

        return $elementArticle
    }
}