const Joi = require("@hapi/joi");
Joi.objectId = require('joi-objectid')(Joi);

function idValidation(id) {
    const schema = Joi.object().keys({
        id: Joi.objectId().required()
    });

    return schema.validate({
        id: id
    });
}

module.exports = idValidation;