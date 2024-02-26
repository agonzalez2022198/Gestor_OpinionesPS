const Opinion = require('../src/models/opiniones.model');

const opinionExistente = async (id = '') => {
    const opinionExs = await Opinion.findOne({id});
    if(opinionExs){
        throw new Error(`La opinion de id ${id} no existe`);
    }
}

module.exports = {
    opinionExistente
}