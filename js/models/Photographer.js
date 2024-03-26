class Photographer {
  constructor(data) {
    this._name = data.name
    this._id = data.id
    this._country = data.country
    this._city = data.city
    this._tagline = data.tagline
    this._portrait = data.portrait
    this._price = data.price
  }

    get name() { return this._name }
    get id() { return this._id }
    get country() { return this._country }
    get city() { return this._city }
    get tagline() { return this._tagline }
    get portrait() { return `/front-end-FishEye/assets/${this._portrait}` }
    get thumbnail() { return `/front-end-FishEye/assets/thumbnails/${this._portrait}` }
    get price() { return this._price }
}
