const jwt = require('jsonwebtoken');

//  =====================
//  Verificar Token
//  =====================
let verificaToken = (req, res, next) => {

    let token = req.get('Authorization');

    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if ( err ) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no valido'
                }
            });
        }

        req.usuario = decoded.usuario;
        return next();

    });

};

//  =====================
//  Verificar Token
//  =====================
let verificarAdminRole = (req, res, next) => {

    let usuario = req.usuario;

    if ( usuario.role !== 'ADMIN_ROLE' ) {

        res.json({
            ok: false,
            err: {
                message: 'Permiso denegado!'
            }
        });

    }

    return next();

};

module.exports = {
    verificaToken,
    verificarAdminRole
};