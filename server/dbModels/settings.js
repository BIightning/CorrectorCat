const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const settingsSchema = new mongoose.Schema({
    remoteLoginApiUrl: { type: String, required: true, minlength: 3 },
    primaryTutorials: [{ type: String, required: true }],
    forcedLanguage: { type: String, default: "English" },

    bConnectToRemoteApi: { type: Boolean, required: true, default: true },

    bNativeRegistrationAllowed: { type: Boolean, required: true, default: true },
    bRemoteRegistrationAllowed: { type: Boolean, required: true, default: false },

    bNativeAccountsActive: { type: Boolean, required: true, default: true },
    bRemoteAccountsActive: { type: Boolean, required: true, default: true },
    bProgressApiActive: { type: Boolean, required: true, default: true },
    bCreditApiActive: { type: Boolean, required: true, default: true },

    bTutorialAccess: { type: Boolean, required: true, default: true },
    bBookStoreAccess: { type: Boolean, required: true, default: false },
    bMyBooksAccess: { type: Boolean, required: true, default: true },
    bQuizAccess: { type: Boolean, required: true, default: false },

    bAutoplayEnabled: { type: Boolean, required: true, default: false },
    autoplayDelay: { type: Number },

    bSystemBasedLanguage: { type: Boolean, required: true, default: true },
});

const Settings = mongoose.model('settings', settingsSchema);

function settingsValidation(data) {
    const schema = Joi.object().keys({
        remoteLoginApiUrl: Joi.string().min(3).required(),
        primaryTutorials: Joi.array().required(),
        forcedLanguage: Joi.string().required(),

        bSystemBasedLanguage: Joi.boolean().required(),
        
        bConnectToRemoteApi: Joi.boolean().required(),

        bNativeRegistrationAllowed: Joi.boolean().required(),
        bRemoteRegistrationAllowed: Joi.boolean().required(),
        bNativeAccountsActive: Joi.boolean().required(),
        bRemoteAccountsActive: Joi.boolean().required(),

        bTutorialAccess: Joi.boolean().required(),
        bBookStoreAccess: Joi.boolean().required(),
        bMyBooksAccess: Joi.boolean().required(),
        bQuizAccess: Joi.boolean().required(),
    
        bAutoplayEnabled: Joi.boolean().required(),
        autoplayDelay: Joi.number().min(3).max(10),
    
        bProgressApiActive: Joi.boolean().required(),
        bCreditApiActive: Joi.boolean().required(),
    });

    return schema.validate({
        remoteLoginApiUrl: data.remoteLoginApiUrl,
        primaryTutorials: data.primaryTutorials,
        forcedLanguage: data.forcedLanguage,

        bSystemBasedLanguage: data.bSystemBasedLanguage,

        bConnectToRemoteApi: data.bConnectToRemoteApi,

        bNativeRegistrationAllowed: data.bNativeRegistrationAllowed,
        bRemoteRegistrationAllowed: data.bRemoteRegistrationAllowed,
        bNativeAccountsActive: data.bNativeAccountsActive,
        bRemoteAccountsActive: data.bRemoteAccountsActive,
        bProgressApiActive: data.bProgressApiActive,
        bCreditApiActive: data.bCreditApiActive,

        bTutorialAccess: data.bTutorialAccess,
        bBookStoreAccess: data.bBookStoreAccess,
        bMyBooksAccess: data.bMyBooksAccess,
        bQuizAccess: data.bQuizAccess,
    
        bAutoplayEnabled: data.bAutoplayEnabled,
        autoplayDelay: data.autoplayDelay,
    });
}

module.exports.Settings = Settings;
module.exports.settingsValidation = settingsValidation;