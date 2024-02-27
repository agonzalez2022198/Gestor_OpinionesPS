const Opinion = require('../models/opiniones.model');
const Publicacion = require('../models/publicacion.model')

const opinionExistente = async (id = '') => {
    const opinionExs = await Opinion.findOne({id});
    if(opinionExs){
        throw new Error(`La opinion de id ${id} no existe`);
    }
}

const publicacionExistente = async (id = '') => {
    const pubExist = await Publicacion.findOne({id});
    if(pubExist){
        throw new Error(`La opinion de id ${id} no existe`);
    }
}

module.exports = {
    opinionExistente,
    publicacionExistente
}