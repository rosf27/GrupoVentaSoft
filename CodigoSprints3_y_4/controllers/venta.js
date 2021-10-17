'use strict'

const Venta = require('../models/venta')

function getVenta(req, res) {
    let ventaId = req.params.ventaId

    Venta.findById(ventaId, (err, venta) => {
        if(err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
        if (!venta) return res.status(404).send({message: 'El venta ' + ventaId + ' no existe'})

        res.status(200).send({venta})
    })
}

function getVentas(req, res) {
    Venta.find({}, (err, ventas) => {
        if(err) return res.status(500).send({message: `Error al realiza la petición: ${err}`})
        if(!ventas) return res.status(404).send({message: 'No hay ventas'})

        res.status(200).send({ventas})
    })
}

function saveVenta (req, res) {
    console.log('POST /api/venta')
    console.log(req.body)

    let venta = new Venta()
    venta.codigo = req.body.codigo
    venta.descripcion = req.body.descripcion
    venta.costo_u = req.body.costo_u
    venta.cantidad = req.body.cantidad

    venta.save((err, ventaStored) => {
        if(err) res.status(500).send({message: `Error al salvar en la base de datos: ${err}`})
        else {res.status(200).send({venta: ventaStored})
                console.log("Exito en envio post")}
    }) 
}

function updateVenta(req, res) {
    let ventaId = req.params.ventaId
    let update = req.body
    Venta.findByIdAndUpdate(ventaId, update, (err, ventaUpdated) => {
        if(err) res.status(500).send({message: `Error al actualizar el venta: ${err}`})
        if (!ventaId) return res.status(404).send({message: `El venta a ser actualizado no existe!`})

        res.status(200).send({venta: ventaUpdated })
    })
}

function deleteVenta(req, res) {
    let ventaId = req.params.ventaId

    Venta.findById(ventaId, (err, venta) => {
    
        if(err) res.status(500).send({message: `Error al borrar en la base de datos: ${err}`})
        if (!venta) return res.status(404).send({message: `El venta a ser borrado no existe!`})

        venta.remove(err => {
            if(err) res.status(500).send({message: `Error al remover en la base de datos: ${err}`}) 
            res.status(200).send({message: 'Se eliminó el venta: ' + ventaId})
        })    
    })
}

module.exports = {
    getVenta,
    getVentas,
    saveVenta,
    updateVenta,
    deleteVenta  
}