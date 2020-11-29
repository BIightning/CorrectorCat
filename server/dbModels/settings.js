const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const settingsSchema = new mongoose.Schema({
    remoteLoginApiUrl: { type: String, required: true, minlength: 3 },
    primaryTutorials: [{ type: String, required: true }],
    bNativeAccountsActive: { type: Boolean, required: true, default: false },
    bRemoteAccountsActive: { type: Boolean, required: true, default: true },
    bProgressApiActive: { type: Boolean, required: true, default: true },

});

const Settings = mongoose.model('settings', settingsSchema);

function settingsValidation(data) {
    const schema = Joi.object().keys({
        remoteLoginApiUrl: Joi.string().min(3).required(),
        primaryTutorials: Joi.array().string().required(),
        bNativeAccountsActive: Joi.boolean().required(),
        bRemoteAccountsActive: Joi.boolean().required(),
        bProgressApiActive: Joi.boolean().required(),
    });
}

module.exports.Settings = Settings;
module.exports.settingsValidation = settingsValidation;