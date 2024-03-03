const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario.model');

const validarJWT = async(req, res) =>{

    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            msg: "No has ingresado el token"
        });

    }


    try {
        const { uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        const usuario = await Usuario.findById(uid);

        if(!usuario){
            return res.status(401).json({
                msg: "No hay ningun usuario con ese id"
            });
        }

        if(usuario.estado){
            return res.status(401).json({
                msg: "El usuario fue eliminado anteriormente"
            });


        }

    } catch (e) {
        console.log(e);
        res.status(401).json({
            msg: "Token no válido"
        });
    }

}

module.exports = {
    validarJWT
}