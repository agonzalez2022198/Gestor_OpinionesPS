const { Schema, model } = require('mongoose');

const UserSchema = Schema({

    nombre: {
        type: String,
        required: [true, 'Es necesario tu nombre']
    },

    apellidos: {
        type: String,
        required: [true, 'Tus apellidos son necesarios']
    },

    correo: {
        type: String,
        required: [true, 'El correo es obligatorio']
    },

    password: {
        type: String,
        required: [true, 'Necesitas una contraseña!!!']
    },

    estado: {
        type: Boolean,
        default: true
    }

});


module.exports = model('Usuario', UserSchema);