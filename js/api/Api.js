class Api {
  /**
   *
   * @param {string} url
   */
  constructor(url) {
    this._url = url;
  }

  async get() {
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