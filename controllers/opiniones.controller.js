const  Opinion = require('../models/opiniones.model');
const { response } = require('express');

const opinionesGet = async (req, res= response) => {
    const {limite, desde} = req.body;
    const query = {estado: true};

    const [total, opiniones] = await Promise.all([
        Opinion.countDocuments(query),
        Opinion.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        opiniones
    });


}


const getOpinionesById = async (req, res) => {
    const {id} = req.params;
    const opinion = await Opinion.findOne({_id: id});

    res.status(200).json({
        opinion
    });
}


const opinionesPost = async (req, res) => {
    const {texto, calificacion, othersDet} =req.body;
    const opinion = new Opinion({texto, calificacion, othersDet});

    await opinion.save();
    res.status(202).json({
        opinion
    });
}

module.exports = {
    opinionesGet,
    getOpinionesById,
    opinionesPost
}