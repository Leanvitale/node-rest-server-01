const express = require('express');

const bcrypt = require('bcrypt');
const _ = require('underscore');

const Usuario = require('../models/usuario');
const { response } = require('express');
const app = express();

app.get('/usuario', function (req, res) {
    
    let desde   = Number(req.query.desde) || 0;
    let limite  = Number(req.query.limite) || 5;


    Usuario.find( { estado: true }, 'nombre email role estado img google' )
            .skip(desde)
            .limit(limite)
            .exec( (err, usuarios) => {

                if ( err ) {
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                }

                Usuario.count({ estado: true }, (err, conteo) => {

                    res.json({
                        ok: true,
                        usuarios,
                        count: conteo
                    })

                })


            });
    
})

// POST USER
app.post('/usuario', function (req, res) {

    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync( body.password, 9 ),
        role: body.role
    });

    usuario.save( (err, usuarioDB) => {

        if ( err ) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });

})


app.put('/usuario/:id', function (req, res) {

    let id = req.params.id;
    let body = _.pick( req.body, ['nombre', 'email', 'img', 'role', 'estado'] );

    Usuario.findByIdAndUpdate( id, body, { new: true, runValidators: true }, (err, usuarioDB) => {
        
        if ( err ) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        })

    });

})

app.delete('/usuario/:id', function (req, res) {
    
    const id = req.params.id;
    let body = { estado: false };

    Usuario.findByIdAndUpdate( id, body, { new: true, runValidators: true }, (err, usuarioDeleted) => {

        if ( err ) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if ( !usuarioDeleted ) {
            return res.status(400).json({
                ok: false,
                error: {
                    message: 'El Usuario no existe'
                }
            });
        }

        res.json({
            ok: true
        })

    });

    
})

module.exports = app;