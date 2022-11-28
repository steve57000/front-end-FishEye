class PhotographersFactory {
    constructor(data, type, id){
        // Si le type correspond à l'ancienne API, alors retourne moi l'ancien formattage
        if (type === 'allPhotographers') {
            return new Photographer(data)
            // Sinon retourne moi le nouveau formattage
        }
        else if (type === 'mediaPhotographers') {
            return new PhotographerMedia(data)
        }
        else if (type === 'photographerProfil') {
            return new Photographer(data)
        }
        // Une bonne pratique est de throw une erreur si le format n'est pas reconnu
        else {
            throw 'Unknown type format'
        }
    }
}