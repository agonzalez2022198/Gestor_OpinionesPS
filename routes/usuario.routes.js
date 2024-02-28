const { Router } = require('express');
const { check } = require('express-validator');

const {getUsuarioById, getUsuarios, putUsuarios, usuariosDelete,
    usuariosPost} = require('../controllers/usuario.controller'
);

const {validarCampos} = require('../middlewares');

const {userExist, existenteEmail} = require('../helper/db-validator');

const router = Router();

router.get("/", getUsuarios);

router.get(
    "/:id",
    [
        check('id', 'El id no existe parce').isMongoId(),
        check('id').custom(getUsuarioById),
        validarCampos
    ],getUsuarioById
);

router.post(
    "/",
    [
        check("nombre", "El nombre no puede estar vacio").not().isEmpty(),
        check("apellidos", "El apellido no puede estar vacio").not().isEmpty(),
        check("correo","Este no es un correo válido").isEmail(),
        check("password", "El telefono no puede estar vacio").isLength({min: 6}),
        check("correo").custom(existenteEmail),
        validarCampos,
    ], usuariosPost
);


router.put(
    "/:id",
    [
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(userExist),
        validarCampos
    ], putUsuarios
);


module.exports = router;