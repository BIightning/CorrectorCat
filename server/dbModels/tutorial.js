const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const tutorialSchema = new mongoose.Schema({
    tutorialTitle: { type: String, required: true },
    position: { type: Number, required: true },
    slides: [{
        slideTitle: { type: String },
        sceneType: { type: Number, required: true },
        catAnimation: { type: String },
        catImage: { type: String, required: true },
        slideText: {
            german: { type: String, required: true },
            english: { type: String, required: true },
            portuguese: { type: String, required: true },
            greek: { type: String, required: true },
        },
        widgetID: { type: Number, default: -1 },
        widgetData: { type: Object }
    }],
    targetTextTitle: { type: String, required: true }
});

const Tutorial = mongoose.model('tutorial', tutorialSchema);

function tutorialValidation(data) {
    const schema = Joi.object().keys({
        tutorialTitle: Joi.string().required(),
        position: Joi.number().required(),
        slides: Joi.array().items(
            Joi.object().keys({
                slideTitle: Joi.string(),
                sceneType: Joi.number().required(),
                catAnimation: Joi.string(),
                catImage: Joi.string().required(),
                slideText: Joi.object().keys({
                    german: Joi.string().required(),
                    english: Joi.string().required(),
                    portuguese: Joi.string().required(),
                    greek: Joi.string().required(),
                }).required(),
                widgetID: Joi.number().required(),
                widgetData: Joi.object()
            })).required(),
        targetTextTitle: Joi.string().required()
    });

    return schema.validate(data);
}

module.exports.Tutorial = Tutorial;
module.exports.tutorialValidation = tutorialValidation;