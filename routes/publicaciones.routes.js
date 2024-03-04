const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos, validarJWT } = require('../middlewares');

const {ensureAuthenticated} = require('../middlewares/autentificado');

const Publicacion = require('../models/publicacion.model');

const {
    publicacionGet, getPublicacinesById, publicacionDelete, publicacionPost, newPost, publicationsPost
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
        validarJWT,
        check("titulo", "El titulo no puede estar vacío").not().isEmpty(),
        check("contenido","El contenido no puede estar vacío").not().isEmpty(),
        validarCampos,
    ], publicationsPost
);

router.delete(
    "/:id",
    [   
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(publicacionExistente),
        validarCampos
    ], publicacionDelete
);


/*router.post ('/publicaciones', ensureAuthenticated, async (req, res) => {
    try {
        const nuevaPublicacion = new Publicacion({
            titulo: req.body.titulo,
            contenido: req.body.contenido,
            autor: req.user._id
        });

        const savePublic = await nuevaPublicacion.save();
        res.status(201).json(savePublic);
    } catch (e) {
        res.status(400).json({msg: e.message});
    }
});*/

/*router.post(
    '/create',
    [
        validarJWT,
        check("titulo", "El titulo no puede estar vacío").not().isEmpty(),
        check("contenido","El contenido no puede estar vacío").not().isEmpty(),
        check("autor","Y el autor").not().isEmpty(),
        validarCampos
    ], newPost
);*/


router.post(
    "/crear",
    [
        
        check("titulo", "El título es requerido").not().isEmpty(),
        check("contenido", "El contenido es requerido").not().isEmpty(),
        validarCampos,
        validarJWT
    ],
    publicationsPost
);


module.exports = router;