'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UsuarioSchema = Schema ({
    cedula: Number,
    nombres: String,
    apellidos: String,
    ocupacion  : { type: String, enum: ['administrador', 'vendedor', 'visitante'] },
    telefono: { type: Number, default: 0 },
    fecha_nacimiento: {type: Date, default: Date.now()}
})

module.exports = mongoose.model('Usuario', UsuarioSchema)
