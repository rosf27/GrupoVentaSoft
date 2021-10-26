'use-strict'

const express = require('express')
const productoCtrl = require('../controllers/producto')
const usuarioCtrl = require('../controllers/usuario')
const ventaCtrl = require('../controllers/venta')
const userCtrl = require('../controllers/user')
const auth = require('../middlewares/auth')
const api = express.Router()

api.get('/venta', ventaCtrl.getVentas)
api.get('/venta/:ventaId',  ventaCtrl.getVenta)
api.post('/venta', ventaCtrl.saveVenta)
api.put('/venta/:ventaId', ventaCtrl.updateVenta)
api.delete('/venta/:ventaId', ventaCtrl.deleteVenta)

api.get('/usuario', usuarioCtrl.getUsuarios)
api.get('/usuario/:usuarioId',  usuarioCtrl.getUsuario)
api.post('/usuario', usuarioCtrl.saveUsuario)
api.put('/usuario/:usuarioId', usuarioCtrl.updateUsuario)
api.delete('/usuario/:usuarioId', usuarioCtrl.deleteUsuario)

api.get('/producto', auth, productoCtrl.getProductos)
api.get('/producto/:productoId',  productoCtrl.getProducto)
api.post('/producto', productoCtrl.saveProducto)
api.put('/producto/:productoId', productoCtrl.updateProducto)
api.delete('/producto/:productoId', productoCtrl.deleteProducto)

api.post('/signup', userCtrl.signUp)
api.post('/signin', userCtrl.signIn)
api.get('/private', auth, (req, res) => {
    res.status(200).send({message: 'Acceso permitido'})
})

module.exports = api
