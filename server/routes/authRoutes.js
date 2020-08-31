const router = require("express").Router();
const Joi = require('@hapi/joi');
const { User } = require('../dbModels/user.js');

//TODO Request to recording studio for authentification !This is not safe, no real authentification happens!
router
    .route('/')
    .post(async(req, res) => {
        let { error } = authValidation(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        let user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).send("Invalid Email or password");

        let token = user.generateAuthToken();
        res.status(200).send({ jwt: token });
    });

function authValidation(data) {
    const schema = Joi.object().keys({
        email: Joi.string().email().required()
    });

    return schema.validate({
        email: data.email
    });
}

module.exports = router;