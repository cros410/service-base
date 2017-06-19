'use strict';

function getinfo(callback) {
    callback(null, {
        cod: 1,
        msg: "STORAGE"
    });
}


module.exports = {
    getinfo
}