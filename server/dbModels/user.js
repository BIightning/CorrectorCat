const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    credits: { type: Number, required: true, default: 0 },
    completedLevels: { type: Number, required: true, default: 0 },
    isNativeAccount: { type: Boolean, required: true },
    isAdmin: { type: Boolean, required: true },
    activityID: { type: Number },
    gameletUserID: { type: Number }
});

userSchema.methods.getPublicFields = function () {
    let publicFields = {
        _id: this._id,
        email: this.email,
        credits: this.credits,
        completedLevels: this.completedLevels
    }
    return publicFields;
}

userSchema.methods.generateAuthToken = function () {
    let authToken = jwt.sign(
        {
            _id: this._id,
            isAdmin: this.isAdmin,
            isNativeAccount: this.isNativeAccount
        },
        process.env.JWT_AUTH_TOKEN_SECRET,
        { expiresIn: '240m' }
    );
    //let refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);

    return authToken;
}

const User = mongoose.model('user', userSchema);

function userValidation(data) {
    const schema = Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        credits: Joi.number().required(),
        completedLevels: Joi.number(),
        activityID: Joi.number(),
        gameletUserID: Joi.number()
    });

    return schema.validate({
        email: data.email,
        password: data.password,
        credits: data.credits,
        completedLevels: data.completedLevels,
        activityID: data.activityID,
        gameletUserID: data.gameletUserID
    });
}

module.exports.User = User;
module.exports.userValidation = userValidation;