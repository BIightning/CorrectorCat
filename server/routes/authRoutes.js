const router = require("express").Router();
const Joi = require('@hapi/joi');
const authController = require('../controllers/authController.js')

//TODO Request to recording studio for authentification 
// !This is not safe, no real authentification happens!
router
    .route('/')
    .post(async(req, res) => {
        await authController
            .authenticate(req.body)
            .then(result => res.status(200).send(result))
            .catch(reason => res.status(reason.code).send(reason.msg));
    });

module.exports = router;