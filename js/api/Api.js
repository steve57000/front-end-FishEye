class Api {
    /**
     *
     * @param {string} url
     */
    constructor(url) {
        this._url = url
    }

    async get() {
        return fetch(this._url {mode: 'no-cors'})
            .then(res => res.json())
            .then(res => {
                let photographers = res.photographers;
                let media = res.media;
                return {
                    photographers,
                    media
                }
            })
            .catch(err => console.log('an error occurs', err))
    }

}

class PhotographerApi extends Api {
    /**
     *
     * @param {string} url
     */
    constructor(url) {
        super(url)
    }

    async getPhotographers() {
        return await this.get()
    }

}

