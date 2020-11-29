const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');
const { User } = require('../dbModels/user.js');
const settingsController = require('../controllers/settingsController');

/**
 * Attempts to login the user with the passed credentials.
 * This function handles both native and remote users.
 * Returns a jwt and a few information about the user if authentication succeeds
 * @param {object} data the username + password
 */
async function authenticate(data) {

    let { error } = authValidation(data);
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