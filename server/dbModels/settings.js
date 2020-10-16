const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const settingsSchema = new mongoose.Schema({
    remoteLoginApiUrl: { type: String, required: true, minlength: 3 },
    bNativeAccountsActive: { type: Boolean, required: true, default: false },
    bProgressApiActive: { type: Boolean, required: true, default: true },
    mainTutorials: [{ type: String, required: true }],

})