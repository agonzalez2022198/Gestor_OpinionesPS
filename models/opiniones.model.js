const { Schema, model } = require('mongoose');

const OpinionesSchema = Schema  ({

    texto:  {
        type: String,
        required: [true, 'Necesitamos una descripcion']
    },

    fecha: {
        type: Date,
        default: Date.now,
        required: [true, 'Fecha automática']
    },

    calificacion: {
        type: String,
        required: [true, 'Cuantas estrellas.']
    },

    othersDet: {
        type: String,
        required: [true, 'No puedes dejar vacio este campo']
    },

    estado:{
        type: Boolean,
        default: true
    }

});

OpinionesSchema.methods.toJSON = function(){
    const{ __v, _id, ...opinion} = this.toObject();
    opinion.uid = _id;
    return opinion;
}

module.exports = model('Opinion', OpinionesSchema);