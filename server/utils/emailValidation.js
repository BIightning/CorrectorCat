const Joi = require("@hapi/joi");

function emailValidation(email) {
    const schema = Joi.object().keys({
        email: Joi.string().email().required()
    })

    return schema.validate({
        email: email
    });
}

module.exports = emailValidation;