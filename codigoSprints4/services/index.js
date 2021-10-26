'use strict'

const jwt = require('jwt-simple')
const moment = require('moment')
const config = require('../config')

function createToken(user) {
    const payload = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(5, 'days').unix(),
    }

    return jwt.encode(payload, config.SECRET_TOKEN)
}

function decodeToken(token) {
    const decoded = new Promise((resolve, reject) => {
        try {
            const payload = jwt.decode(token, config.SECRET_TOKEN, 'HS256')  
            if(payload.exp <= moment().unix()){
                console.log('reject 401, token expirado')
                reject({
                    status: 401,
                    message: 'El token ha expirado!'
                })
            }
            resolve(payload.sub)
        }catch(err) {
        console.log('token invalido')
            reject({
                status: 500,
                message: 'Token invalido'
            })
        }
    })
    console.log('Retorna decoded ' + decoded)
    return decoded
}

module.exports = {
    createToken,
    decodeToken
}