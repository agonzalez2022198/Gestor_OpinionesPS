const ensureAuthenticated = async(req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).send('No autenticado');
}


module.exports = {
    ensureAuthenticated
}