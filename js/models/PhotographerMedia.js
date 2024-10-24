class PhotographerMedia {
    constructor(mediaPhotographer) {
        this._id = mediaPhotographer.id
        this._photographerId = mediaPhotographer.photographerId
        this._title = mediaPhotographer.title
        this._media_image = mediaPhotographer.image
        this._media_video = mediaPhotographer.video
        this._likes = mediaPhotographer.likes
        this._date = mediaPhotographer.date
        this._price = mediaPhotographer.price
    }

    get id() { return this._id }
    get photographerId() { return this._photographerId }
    get title() { return this._title }
    get media() {
            switch (this._media_image ? this._media_image : this._media_video) {
                case this._media_image :
                    return {
                        "createLinkLow": `./assets/SamplePhotos/lowQuality/${this._photographerId}/${this._media_image}`,
                        "createLinkMedium": `./assets/SamplePhotos/mediumQuality/${this._photographerId}/${this._media_image}`,
                        "attrType": "webp"
                    }
                case this._media_video :
                    return {
                        "createLink": `./assets/SamplePhotos/lowQuality/${this._photographerId}/${this._media_video}`,
                        "attrType": "mp4"
                    }
                default:
                    return null
            }
    }
    get likes() { return this._likes }
    get date() { return this._date }
    get price() { return this._price }

}