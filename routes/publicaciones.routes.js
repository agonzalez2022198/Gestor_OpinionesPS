const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares');

const {
    publicacionGet, getPublicacinesById, publicacionDelete, publicacionPost
} = require('../controllers/publicacion.controller');

const { publicacionExistente } = require('../helper/db-validator');

const router = Router();

router.get("/", publicacionGet);

router.get(
    "/:id",
    [
        check("id", "No es un id valido").isMongoId(),
        check('id').custom(publicacionExistente),
        validarCampos
    ], getPublicacinesById
);

router.post(
    "/",
    [
        check("titulo", "El titulo no puede estar vacío").not().isEmpty(),
        check("contenido","El contenido no puede estar vacío").not().isEmpty(),
        check("autor","Y el autor").not().isEmpty(),
        validarCampos,
    ], publicacionPost
);

router.delete(
    "/:id",
    [   
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(publicacionExistente),
        validarCampos
    ], publicacionDelete
);


module.exports = router;