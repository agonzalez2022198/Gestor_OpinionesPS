const mongoose = require('mongoose')

const PublicacionSchema = mongoose.Schema({
    titulo: {
        type: String,
        required: [true, 'Es necesario el titulo']
    },

    contenido: {
        type: String,
        required: [true, 'No hay contenido']
    },

    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }, 

    fechaPublic: {
        type: Date,
        default: Date.now,
        required: [true, 'La fecha es automática']
    }
});

module.exports = mongoose.model('Publicacion', PublicacionSchema);
