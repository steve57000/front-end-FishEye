class PhotographerCardPageProfil {
    constructor(photographer) {
        this._photographer = photographer;
        this.$footerElement = document.querySelector('.footer-photographer-page')

        const elementDivLikes = document.createElement('div')

        const elementSpanLikes = document.createElement('span')
        elementSpanLikes.id = 'totalLikes'
        const elementI = document.createElement( 'i' )
        elementI.setAttribute('class' , 'fa fa-heart i-total-likes')
        elementI.style.color = 'red'

        elementDivLikes.appendChild( elementSpanLikes )
        elementDivLikes.appendChild( elementI )
        this.$footerElement.appendChild( elementDivLikes )

    }

    modifyPhotographerCard() {
        // Get HTML head element
        const head = document.getElementsByTagName('HEAD')[0];

        const selectTitle = head.childNodes[13]
        selectTitle.textContent = 'Fisheye - photographe'

        const changeClassNameSection = document.getElementById('photographer_section')
        changeClassNameSection.id = 'photographer_section_profil'

        const $elementDiv = document.createElement( 'div' )
        $elementDiv.classList.add('photograph_header')

        const elementButton = document.createElement( 'button' )
        elementButton.className = 'contact_button'
        addMultipleAttributes(elementButton, {
            'tabindex': 0,
            'data-toggle': 'modal',
            'data-target': '#contact_modal',
            'onclick': 'displayModal()'
        })
        elementButton.textContent = 'Contactez-moi'

        const elementArticle = document.createElement( 'article' )
        elementArticle.classList.add('photographer_card_page_profil')

        const elementFigure = document.createElement( 'figure')
        elementFigure.className = 'figure-photograph'

        const elementImage = document.createElement( 'img' )
        elementImage.src = `${this._photographer.thumbnail}`
        elementImage.alt = `Photo de profil du photographe ${this._photographer.name}`
        elementImage.className = 'object-position'
        addMultipleAttributes(elementImage,{
            'width': '200',
            'height': '200'
        })

        const elementFigcaption = document.createElement('figcaption')
        elementFigcaption.className = 'photographer_card_info'


        const elementName = document.querySelector('h1')
        elementName.textContent = `${this._photographer.name}`

        const elementCity = document.createElement('p')
        elementCity.className = 'photographer_card_city'
        elementCity.innerHTML = `${this._photographer._city}, ${this._photographer._country}`

        const elementTagline = document.createElement('p')
        elementTagline.className = 'photographer_card_tagline'
        elementTagline.innerHTML = `${this._photographer._tagline}`

        const elementPrice = document.createElement('p')
        elementPrice.className = 'photographer_card_price'
        elementPrice.innerHTML = `${this._photographer._price}\u20AC/Jour `

        // Append link element to HTML
        elementFigure.appendChild(elementFigcaption)

        elementFigcaption.appendChild(elementName)
        elementFigcaption.appendChild(elementCity)
        elementFigcaption.appendChild(elementTagline)

        elementFigure.appendChild(elementButton)
        elementFigure.appendChild(elementImage)
        // elementFigcaption.appendChild(elementPrice)

        elementArticle.appendChild(elementFigure)

        $elementDiv.appendChild(elementArticle)

        this.$footerElement.appendChild(elementPrice)

        return $elementDiv
    }

}
