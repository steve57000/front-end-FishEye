class Filter {
    /**
     *
     * @param {string} option
     * @param {array} Medias
     * @returns
     */
    static async filterByOption(option, Medias) {
        await new Promise(resolve => setTimeout(resolve, 200))

        switch (option) {
            case 'title' :
                return Medias.sort((a, b) =>
                    a._title.localeCompare(b._title)
                )
            case 'date' :
                return Medias.sort((a, b) => {
                    return new Date(b._date) - new Date(a._date)
                })
            case 'popularity' :
                return Medias.sort((a, b) => {
                    if(a === b) {
                        return a._title.localeCompare(b._title)
                    }
                    else {
                        return b._likes - a._likes
                    }
                })
            default :
                return Medias.sort((a, b) => {
                    return b._likes - a._likes
                })
        }
    }
}
