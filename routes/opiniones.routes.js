const {Router} = require('express');
const {check} = require('express-validator');

const {
    opinionesGet,
    getOpinionesById,
    opinionesPost
} = require('../controllers/opiniones.controller');

