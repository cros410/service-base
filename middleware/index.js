'use strict';
const jwt = require('jwt-simple');
const moment = require('moment');

function authPrivate(req, res, next) {
    if (!req.headers.authorization) {
        return res
            .status(403)
            .send({
                message: "Tu petición no tiene cabecera de autorización"
            });
    }

    var token = req.headers.authorization.split(" ")[1];
    try {
        var payload = jwt.decode(token, "clave");
        if (payload.exp <= moment().unix()) {
            return res
                .status(401)
                .send({
                    message: "El token ha expirado"
                });
        }
        req.user = payload.sub;
        next();

    } catch (err) {
        console.log(err);
        res.status(500).send({
            cod: 0,
            msg: "ERROR SERVICE"
        });
    }
}

function uno(req, res, next) {
    console.log("middleware");
    next();
}

module.exports = {
    uno,
    authPrivate
}