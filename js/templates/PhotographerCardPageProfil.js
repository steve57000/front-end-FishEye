class PhotographerCardPageProfil {
    constructor(photographer) {
        this._photographer = photographer

        this.$mainfooter = document.querySelector('#main')
        this.$footerElement = document.createElement('div')
        this.$footerElement.className = 'footer-photographer-page'

        const elementDivLikes = document.createElement('div')
        elementDivLikes.id = 'container-total-likes'

        const elementSpanLikes = document.createElement('span')
        elementSpanLikes.id = 'totalLikes'
        const elementI = document.createElement( 'strong' )
        elementI.setAttribute('class' , 'fa fa-heart i-total-likes')
        elementI.style.color = 'red'

        elementDivLikes.appendChild( elementSpanLikes )
        elementDivLikes.appendChild( elementI )
        this.$footerElement.appendChild( elementDivLikes )
        this.$mainfooter.appendChild(this.$footerElement)
        this.modifyTitleHead()

    }
    modifyTitleHead(){
        // Get HTML head element
        const head = document.getElementsByTagName('HEAD')[0];

        const selectTitle = head.childNodes[1]
        selectTitle.textContent = `Fisheye - Profil de ${this._photographer.name}, voir ses photos et entrer en contact`
    }

    modifyPhotographerCard() {
        const changeIdNameSection = document.getElementById('photographer_section')
        changeIdNameSection.id = 'photographer_section_profil'
        
        const $elementDiv = document.createElement( 'div' )
        $elementDiv.classList.add('photograph_header')

        const elementButton = document.createElement( 'button' )
        addMultipleAttributes(elementButton, {
            'id': 'contact_button',
            'onclick': 'displayModal(this)',
            'onkeypress': 'displayModal(this)',
            'aria-label': `Contactez ${this._photographer.name}`,
            'aria-expanded': 'false',
            'aria-controls': 'contact_modal',
            'aria-haspopup': 'false',
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
            'height': '200',
            'aria-labelledby': 'photographer-name'
        })

        const elementFigcaption = document.createElement('figcaption')
        elementFigcaption.className = 'photographer_card_info'


        const elementName = document.querySelector('h1')
        elementName.id = 'photographer-name'
        elementName.textContent = `${this._photographer.name}`

        const elementCity = document.createElement('h2')
        elementCity.className = 'photographer_card_city'
        elementCity.innerHTML = `${this._photographer._city}, ${this._photographer._country}`

        const elementTagline = document.createElement('q')
        elementTagline.className = 'photographer_card_tagline'
        elementTagline.innerHTML = `${this._photographer._tagline}`

        const elementPrice = document.createElement('p')
        elementPrice.id= 'photographer_card_price'
        elementPrice.innerHTML = `${this._photographer._price}\u20AC/Jour `

        // Append link element to HTML
        elementFigure.appendChild(elementFigcaption)

        elementFigcaption.appendChild(elementName)
        elementFigcaption.appendChild(elementCity)
        elementFigcaption.appendChild(elementTagline)

        elementFigure.appendChild(elementButton)
        elementFigure.appendChild(elementImage)

        elementArticle.appendChild(elementFigure)

        $elementDiv.appendChild(elementArticle)

        this.$footerElement.appendChild(elementPrice)

        return $elementDiv
    }

}
