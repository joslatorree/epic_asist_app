//get instance of app from express
const express = require('express');
const router = express.Router();

const { auth_Controller,
    usuario_Controller} = require('../controllers/barrel_Controller');


router.use('/login', auth_Controller.index);
router.use('/dashboard', auth_Controller.dashboard);
router.use('/registrar_usuario', auth_Controller.registrar_usuario);
router.use('/gestor_usuarios', usuario_Controller.gestor_usuarios);


module.exports = router;
