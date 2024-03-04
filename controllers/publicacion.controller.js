const Publicacion = require('../models/publicacion.model');
const User = require('../models/usuario.model');
const { response } = require('express');

const publicacionGet = async (req, res =response) => {
    const {limite, desde} = req.query;
    const query = {estado: true};

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


const newPost = async (req, res) => {
    const { titulo, contenido } = req.body;
    const usuarioId = req.userId; // ID del usuario autenticado obtenido del token JWT

    try {
        const publicacion = new Publicacion({ titulo, contenido, autor: usuarioId });
        await publicacion.save();

        res.status(201).json({ msg: 'Publicación creada correctamente', publicacion });
    } catch (error) {
        console.error('Error al crear la publicación:', error);
        res.status(500).json({ msg: 'Error al crear la publicación' });
    }
};


const publicationsPost = async (req, res) => {
    const user = req.usuario;

    const { titulo, contenido } = req.body;

    try {
        const publication = new Publicacion({
            titulo,
            contenido,
            usuario: user._id,
        });

        await publication.save();

        const usuario = await User.findById(user._id);

        res.status(200).json({
            msg: 'Publicación agregada exitosamente',
            publication: {
                ...publication.toObject(),
                usuario: usuario.correo
            }
        });
    } catch (error) {
        console.error('Error al crear la publicación:', error);
        res.status(500).json({ error: 'Error al crear la publicación' });
    }
};



module.exports = {
    publicacionGet,
    getPublicacinesById,
    publicacionDelete,
    publicacionPost,
    newPost,
    publicationsPost
}