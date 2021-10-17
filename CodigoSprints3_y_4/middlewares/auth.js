'use strict'

const { response } = require('express')
const services = require('../services')

function isAuth(req, res, next) {
    //console.log('IsAuth')
    if (!req.headers.authorization){
        return res.status(403).send({message: 'No tienes autorizacion!'})
    }

    const token = req.headers.authorization.split(' ')[1]
    //console.log('El token recibido es: ' + token)
    services.decodeToken(token)
        .then(response => {
            console.log('token aceptado')
            req.user = response
            next()
        })
        .catch(response => {
            res.status(response.status)
        })
}

module.exports = isAuth
