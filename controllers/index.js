'use strict';
const auth = require("../auth/auth");
const storage = require("../storage/index");
const loop = require("../suport/loop");
const fs = require("fs");
const Log = require('log'),
    log = new Log('info', fs.createWriteStream('./logs/log.log'));

function test(req, res) {
    storage.getinfo((err, data) => {
        if (err) {
            res.send({
                cod: 0,
                msg: "ERROR BD"
            });
            return;
        }
        log.info("CORRECTO");
        res.send(data);
    });
}

function generateAuth(req, res) {
    res.send({
        cod: 1,
        msg: auth.createToken("1")
    })
}

function validateAuth(req, res) {
    res.send({
        cod: 1,
        msg: "AUTH OK"
    });
}

function uno(req, res) {
    res.send({
        cod: 1,
        msg: "UNO"
    });
}

function validateLoop(req, res) {
    var array = ["uno", "dos", "tres"];
    loop.asyncLoop(array.length, (loopp) => {
        loop.someFunction(1, 1, (rst) => {
            var it = loopp.iteration();
            console.log(it);
            if (it == 1) {
                loopp.break({});
            }
            loopp.next();
        });
    }, (err) => {
        if (err) {
            console.log("ERROR LOOP");
            res.send({
                cod: 0,
                err: "ERROR LOOP"
            });
        } else {
            res.send({
                cod: 1,
                msg: "LOOP OK"
            });
        }

    });
}

module.exports = {
    test,
    uno,
    generateAuth,
    validateAuth,
    validateLoop
}