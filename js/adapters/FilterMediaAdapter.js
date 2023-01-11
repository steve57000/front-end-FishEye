class FilterMediaAdapter {
    constructor(Medias, option) {
        this.Medias = Medias
        this.option = option
    }
    async filterByOption() {
        return await Filter.filterByOption(this.option, this.Medias)
    }

}