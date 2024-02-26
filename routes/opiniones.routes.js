const {Router} = require('express');
const {check} = require('express-validator');

const {
    opinionesGet,
    getOpinionesById,
    opinionesPost
} = require('../controllers/opiniones.controller');


const {validarCampos} = require('../middlewares');

const {opinionExistente} = require('../helper/db-validator');

const router = Router();

router.get("/", opinionesGet);

router.get(
    "/:id",
    [
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(getOpinionesById),
        validarCampos
    ], getOpinionesById);

router.post(
    "/",
    [
        check("texto", "El texto no puede estar vacio").not().isEmpty(),
        check("calificacion", "Y la calificación").not().isEmpty(),
        check("othersOpinion", "Por si hay algo más").not().isEmpty()
    ], opinionesPost
);

module.exports = router;