'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const VentaSchema = Schema ({
    codigo: String,
    descripcion: String,
    costo_u: { type: Number, default: 0 },
    cantidad: { type: Number, default: 0 }
})

module.exports = mongoose.model('Venta', VentaSchema)