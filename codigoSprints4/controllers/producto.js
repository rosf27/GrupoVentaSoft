'use strict'

const Producto = require('../models/producto')

function getProducto(req, res) {
    let productoId = req.params.productoId

    Producto.findById(productoId, (err, producto) => {
        if(err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
        if (!producto) return res.status(404).send({message: 'El producto ' + productoId + ' no existe'})

        res.status(200).send({producto})
    })
}

function getProductos(req, res) {
    Producto.find({}, (err, productos) => {
        if(err) return res.status(500).send({message: `Error al realiza la petición: ${err}`})
        if(!productos) return res.status(404).send({message: 'No hay productos'})

        res.status(200).send({productos})
    })
}

function saveProducto (req, res) {
    console.log('POST /api/producto')
    console.log(req.body)

    let producto = new Producto()
    producto.nombre = req.body.nombre
    producto.foto = req.body.foto
    producto.precio_compra = req.body.precio_compra
    producto.precio_venta = req.body.precio_venta
    producto.cantidad = req.body.cantidad
    producto.categoria = req.body.categoria
    producto.descripcion = req.body.descripcion

    producto.save((err, productoStored) => {
        if(err) res.status(500).send({message: `Error al salvar en la base de datos: ${err}`})
        else {res.status(200).send({producto: productoStored})
                console.log("Exito en envio post")}
    }) 
}

function updateProducto(req, res) {
    let productoId = req.params.productoId
    let update = req.body
    
    Producto.findByIdAndUpdate(productoId, update, (err, productoUpdated) => {
        if(err) res.status(500).send({message: `Error al actualizar el producto: ${err}`})
        if (!productoId) return res.status(404).send({message: `El producto a ser actualizado no existe!`})

        res.status(200).send({producto: productoUpdated })
    })
}

function deleteProducto(req, res) {
    let productoId = req.params.productoId

    Producto.findById(productoId, (err, producto) => {
    
        if(err) res.status(500).send({message: `Error al borrar en la base de datos: ${err}`})
        if (!producto) return res.status(404).send({message: `El producto a ser borrado no existe!`})

        producto.remove(err => {
            if(err) res.status(500).send({message: `Error al remover en la base de datos: ${err}`}) 
            res.status(200).send({message: 'Se eliminó el producto: ' + productoId})
        })    
    })
}

module.exports = {
    getProducto,
    getProductos,
    saveProducto,
    updateProducto,
    deleteProducto  
}