'use strict'

const Usuario = require('../models/usuario')

function getUsuario(req, res) {
    let usuarioId = req.params.usuarioId

    Usuario.findById(usuarioId, (err, usuario) => {
        if(err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
        if (!usuario) return res.status(404).send({message: 'El usuario ' + usuarioId + ' no existe'})

        res.status(200).send({usuario})
    })
}

function getUsuarios(req, res) {
    Usuario.find({}, (err, usuarios) => {
        if(err) return res.status(500).send({message: `Error al realiza la petición: ${err}`})
        if(!usuarios) return res.status(404).send({message: 'No hay usuarios'})

        res.status(200).send({usuarios})
    })
}

function saveUsuario (req, res) {
    console.log('POST /api/usuario')
    console.log(req.body)

    let usuario = new Usuario()
    usuario.cedula = req.body.cedula
    usuario.nombres = req.body.nombres
    usuario.apellidos = req.body.apellidos
    usuario.ocupacion = req.body.ocupacion
    usuario.telefono = req.body.telefono
    usuario.fecha_nacimiento = req.body.fecha_nacimiento

    usuario.save((err, usuarioStored) => {
        if(err) res.status(500).send({message: `Error al salvar en la base de datos: ${err}`})
        else {res.status(200).send({usuario: usuarioStored})
                console.log("Exito en envio post")}
    }) 
}

function updateUsuario(req, res) {
    let usuarioId = req.params.usuarioId
    let update = req.body
    
    Usuario.findByIdAndUpdate(usuarioId, update, (err, usuarioUpdated) => {
        if(err) res.status(500).send({message: `Error al actualizar el usuario: ${err}`})
        if (!usuarioId) return res.status(404).send({message: `El usuario a ser actualizado no existe!`})

        res.status(200).send({usuario: usuarioUpdated })
    })
}

function deleteUsuario(req, res) {
    let usuarioId = req.params.usuarioId

    Usuario.findById(usuarioId, (err, usuario) => {
    
        if(err) res.status(500).send({message: `Error al borrar en la base de datos: ${err}`})
        if (!usuario) return res.status(404).send({message: `El usuario a ser borrado no existe!`})

        usuario.remove(err => {
            if(err) res.status(500).send({message: `Error al remover en la base de datos: ${err}`}) 
            res.status(200).send({message: 'Se eliminó el usuario: ' + usuarioId})
        })    
    })
}

module.exports = {
    getUsuario,
    getUsuarios,
    saveUsuario,
    updateUsuario,
    deleteUsuario  
}