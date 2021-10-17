'use strict'

const jwt = require('jwt-simple')
const moment = require('moment')
const config = require('../config')

function createToken(user) {
    const payload = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(14, 'days)').unix(),
    }

    return jwt.encode(payload, config.SECRET_TOKEN)
}

function decodeToken(token) {
    //console.log('decodeToken')
    const decoded = new Promise((resolve, reject) => {
        //console.log('decoded')
        try {
            //console.log('Antes de payload, token, secreto ' + token + ', ' + config.SECRET_TOKEN)
            const payload = jwt.decode(token, config.SECRET_TOKEN)
            //console.log(payload)  
            if(payload.exp <= moment().unix()){
                reject({
                    status: 401,
                    message: 'El token ha expirado!'
                })
            }
            resolve(payload.sub)
        }   catch(err) {
                reject({
                    status: 500,
                    message: 'Token invalido'
            })
        }
    })

    return decoded
}

module.exports = {
    createToken,
    decodeToken
}