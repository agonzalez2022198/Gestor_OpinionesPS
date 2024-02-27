const Publicacion = require('../models/publicacion.model');
const { response } = require('express');

const publicacionGet = async (req, res =response) => {
    const {limite, desde} = req.query;
    const query = {estado: true}

    const [total, publicacion] = await Promise.all([
        Publicacion.countDocuments(query),
        Publicacion.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        publicacion
    });

}


const getPublicacinesById = async (req, res) => {
    const {id} = req.params;
    const publicacion = await Publicacion.findOne({_id: id});

    res.status(200).json({
        publicacion
    });

}


const publicacionDelete = async (req, res) => {

    const {id} = req.params;
    const publicacion = await Publicacion.findByIdAndUpdate(id, {estado: false});

    res.status(200).json({
        publicacion,
        msg: "Eliminaste la publicación"
    });
}


const publicacionPost = async (req, res) => {
    const {titulo, contenido, autor} = req.body;
    const publicacion = new Publicacion({titulo, contenido, autor});

    await publicacion.save();

    res.status(202).json({
        publicacion
    });
}


module.exports = {
    publicacionGet,
    getPublicacinesById,
    publicacionDelete,
    publicacionPost
}