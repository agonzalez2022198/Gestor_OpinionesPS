const validarCampos  = require('../middlewares/validar-campos');
const calidarJWT = require('../middlewares/validar-jwt')

module.exports = {
    ...validarCampos,
    ...calidarJWT
}