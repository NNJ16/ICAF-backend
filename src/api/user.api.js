const express = require('express');
const router = express.Router();
const UserController = require('../controller/user.controller.js');

module.exports = function (){
    router.get('/', UserController.getAllUsers);
    router.post('/create', UserController.createUser);
    router.post('/validate', UserController.validateUser);
    router.post('/delete',UserController.deleteUser);
    return router;
}
