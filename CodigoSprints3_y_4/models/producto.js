'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductoSchema = Schema ({
    nombre: String,
    foto: String,
    precio_compra: { type: Number, default: 0 },
    precio_venta: { type: Number, default: 0 },
    cantidad: { type: Number, default: 0 },
    categoria: { type: String, enum: ['computadores', 'autos', 'deportes', 'electrodomesticos'] },
    descripcion: String
})

module.exports = mongoose.model('Producto', ProductoSchema)
