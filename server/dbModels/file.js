const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);
var mongoose = require('mongoose');

var FileSchema = new mongoose.Schema({
    fileUrl: { type: String, required: true },
    fileName: { type: String, required: true },
    fileType: { type: String, required: true }, //image or audio
    ownerId: { type: String, required: true },
    uploaded: { type: Date, default: Date.now }
});

const File = mongoose.model('file', FileSchema);

function fileValidation(data) {
    const schema = Joi.object().keys({
        fileUrl: Joi.string().min(3).required(),
        fileName: Joi.string().min(3).required(),
        ownerId: Joi.objectId().required(),
        fileType: Joi.string().required()
    });

    return schema.validate({
        fileUrl: data.fileUrl,
        fileName: data.fileName,
        ownerId: data.ownerId,
        fileType: data.fileType
    })
}

module.exports.File = File;
module.exports.fileValidation = fileValidation;