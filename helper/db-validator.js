const Opinion = require('../models/opiniones.model');
const Publicacion = require('../models/publicacion.model');
const Usuario = require('../models/usuario.model');

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


const userExist = async (id = '') => {
    const usuario = await Usuario.findOne({id});
    if(usuario){
        throw new Error(`El usuario con id ${id} no existe`);
    }
}


const existenteEmail = async(correo = '') => {
    const existeEmail = await Usuario.findOne({correo});
    if(existeEmail){
        throw new Error(`El correo ${ correo } ya está registrado`);
    }


}


module.exports = {
    opinionExistente,
    publicacionExistente,
    userExist,
    existenteEmail
}