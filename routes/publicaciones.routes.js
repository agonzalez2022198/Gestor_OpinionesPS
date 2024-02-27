const { Router } = require('express');
const { check } = requier('express-validator');

const { validarCampos } = require('../middlewares');

const {
    publicacionGet, getPublicacinesById, publicacionDelete, publicacionPost
} = require('../controllers/publicacion.controller');

