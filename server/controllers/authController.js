const Joi = require('@hapi/joi');
const { User } = require('../dbModels/user.js');

//TODO Request to recording studio for authentification 
// !This is not safe, no real authentification happens!
function authenticate(data) {
    return new Promise(async(resolve, reject) => {
        let { error } = authValidation(data);
        if (error)
            reject({ code: 400, msg: error.details[0].message });

        let user = await User.findOne({ email: data.email })
            .catch(reason => reject({ code: 500, msg: 'internal server error!' }));
        if (!user)
            reject({ code: 404, msg: "Invalid Email or password" })
            //TODO: Send email and password to recording studio.
            //Redirect for new users
        let token = user.generateAuthToken();
        resolve({ token: token, user: user });
    });
}


function authValidation(data) {
    const schema = Joi.object().keys({
        email: Joi.string().email().required()
    });

    return schema.validate({
        email: data.email
    });
}

module.exports.authenticate = authenticate;