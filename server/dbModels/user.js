const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    name: { type: String, required: true },
    avatar: { type: String, required: true },
    credits: { type: Number, required: true },
    completedLevels: { type: Number, required: true },
    isAdmin: { type: Boolean, required: true }
});

userSchema.methods.generateAuthToken = function() {
    let authToken = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, process.env.JWT_AUTH_TOKEN_SECRET, { expiresIn: '240m' });
    //let refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);

    return authToken;
}

const User = mongoose.model('user', userSchema);

function userValidation(data) {
    const schema = Joi.object().keys({
        email: Joi.string().email().required(),
        name: Joi.string().min(3).required(),
        avatar: Joi.string().min(3).required(),
        credits: Joi.number().required(),
        completedLevels: Joi.number().required(),
        isAdmin: Joi.boolean()
    });

    return schema.validate({
        email: data.email,
        name: data.name,
        avatar: data.avatar,
        credits: data.credits,
        completedLevels: data.completedLevels,
        isAdmin: data.isAdmin
    });
}

module.exports.User = User;
module.exports.userValidation = userValidation;