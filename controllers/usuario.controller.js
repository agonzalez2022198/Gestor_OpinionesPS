const bcryptjs = require('bcrypt');
const Usuario = require('../models/usuario.model');
const {response} = require('express');


const getUsuarios = async(req, res = response) => {

    const{limite, desde} = req.query;
    const query = {estado: true};

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        usuarios
    });


}


const getUsuarioById = async (req, res) => {
    const {id} = req.params;
    const usuario = await Usuario.findOne({_id: id});

    res.status(200).json({
        usuario
    });
}


const putUsuarios = async (req, res = response) => {
    const { id } = req.params;
    const { _id, ...resto } = req.body;

    try {
        
        await Usuario.findByIdAndUpdate(id, resto);

        
        const usuarioAct = await Usuario.findById(id);

        res.status(200).json({
            usuario: usuarioAct,
            msg: 'Tu cuenta se ha actualizado'
        });
    } catch (error) {
        console.error('Error al actualizar tu cuenta:', error);
        res.status(500).json({ error: 'Error del servidor al actualizar el perfil' });
    }
}




const usuariosPost = async (req, res) => {
    const {nombre, apellidos, correo, password} = req.body;
    const usuario = new Usuario({nombre, apellidos, correo, password});

    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    await usuario.save();
    res.status(202).json({
        usuario
    });
}


module.exports = {
    getUsuarios,
    getUsuarioById,
    putUsuarios,
    usuariosPost
}