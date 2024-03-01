const { Schema, model } = require('mongoose');

const PublicacionSchema = Schema({
    titulo: {
        type: String,
        required: [true, 'Es necesario el titulo']
    },

    contenido: {
        type: String,
        required: [true, 'No hay contenido']
    },

    autor: {
        type: Schema.Types.ObjectId, // Aquí cambia a Schema.Types.ObjectId
        ref: 'Usuario'
    },

    fechaPublic: {
        type: Date,
        default: Date.now,
        required: [true, 'La fecha es automática']
    }
});

module.exports = model('Publicacion', PublicacionSchema);
