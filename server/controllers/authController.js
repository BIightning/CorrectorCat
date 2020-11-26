const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');
const { User } = require('../dbModels/user.js');
const settingsController = require('../controllers/settingsController');

//TODO Request to recording studio for authentification 
// !This is not safe, no real authentification happens!
async function authenticate(data) {

    let { error } = authValidation(data);
    if (error)
        if (error) {
            let err = new Error(error.details[0].message);
            err.code = 400;
            throw err;
        }

    const settings = settingsController.getSettingsSync();

    let user = await User.findOne({ email: data.email })
    if (user === null) {
        //TODO: Send email and password to recording studio if remote login is enabled.
        //Redirect for new users
        let err = new Error("Invalid Email or password");
        err.code = 400;
        throw err;
    }
    if (user.isNativeAccount) {
        const validPassword = await bcrypt.compare(data.password, user.password);

        if (!validPassword) {
            let err = new Error("Invalid Email or password");
            err.code = 400;
            throw err;
        }

    } else if (settings.bRemoteAccountsActive) {
        //TODO: Send email and password to recording studio if remote login is enabled.
    } else {
        let err = new Error("Invalid Email or password");
        err.code = 400;
        throw err;
    }

    return result = {
        jwt: user.generateAuthToken(),
        user: {
            email: user.email,
            _id: user._id
        }
    }

    /*
    console.log(`jwt: ${jwt}`);
    return createResponseData(jwt, user);*/

}
/**
 *Returns a jwt and a few information about the user
 *@param userData the full user object (from the database)
 */
function createResponseData(jwt, userData) {
    let result = {
        jwt: "",
        user: {}
    }
    result.jwt = jwt;

    let user;
    user.email = userData.email;
    user._id = userData._id;

    result.user = user;
    return result;
}



function authValidation(data) {
    const schema = Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().min(3).required()
    });

    return schema.validate({
        email: data.email,
        password: data.password
    });
}

module.exports.authenticate = authenticate;