class Api {
  /**
   *
   * @param {string} url
   */
  constructor(url) {
    this._url = url.concat('front-end-FishEye/');
    console.log(url)
  }

  async get() {
    console.log(this._url)
    return fetch(this._url)
      .then((res) => res.json())
      .then((res) => {
        const { photographers } = res;
        const { media } = res;
        return {
          photographers,
          media,
        };
      })
      .catch((err) => new Error("an error occurs", err));
  }
}

class PhotographerApi extends Api {
  /**
   *
   * @param {string} url
   */
  constructor(url) {
    super(url);
  }

  async getPhotographers() {
    return await this.get();
  }
}
