const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const pageContentSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    page_html: { type: String, required: true }
});
const PageContent = mongoose.model('pageContent', pageContentSchema);

function pageContentValidation(data) {
    const schema = Joi.object().keys({
        title: Joi.string().required(),
        page_html: Joi.string().required()
    });
    return schema.validate({
        title: data.title,
        page_html: data.page_html
    });
}

module.exports.PageContent = PageContent;
module.exports.pageContentValidation = pageContentValidation;