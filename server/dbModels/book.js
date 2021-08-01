const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true, minlength: 3 },
    author: { type: String, required: true, minlength: 3 },
    series: { type: String, required: true, minlength: 3 },
    language: { type: String, required: true },
    starting: { type: Boolean, required: true },
    cost: { type: Number, required: true },
    difficulty: { type: String, required: true, minlength: 3 },
    imagePath: { type: String, required: true, minlength: 3 },
    creditTarget: { type: Number, required: true },
    tutorialAfterCompletion: { type: String, minlength: 3 },
    description: { type: String, minlength: 3 },
    textChunks: [{
        text: { type: String, required: true },
        audioCorrect: { type: String, required: true },
        audioWrong: { type: String, required: true },
        points: { type: Number, required: true },
        question: {
            answers: [{ type: String, required: true }],
            correctIndex: { type: Number, required: true },
            explanation: { type: String, required: true }
        }
    }],
    quiz: [{
        question: { type: String, required: true },
        points: { type: Number, required: true },
        answers: [{ type: String, required: true }],
        correctIndex: { type: String, required: true }
    }]
});

const Book = mongoose.model('book', bookSchema);

function bookValidation(data) {
    const schema = Joi.object().keys({
        title: Joi.string().min(3).required(),
        author: Joi.string().min(3).required(),
        series: Joi.string().min(3).required(),
        language: Joi.string().required(),
        starting: Joi.boolean().required(),
        cost: Joi.number().required(),
        difficulty: Joi.string().required(),
        imagePath: Joi.string().required(),
        creditTarget: Joi.number().positive().required(),
        tutorialAfterCompletion: Joi.objectId(),
        description: Joi.string(),

        textChunks: Joi.array().items(
            Joi.object().keys({
                text: Joi.string().required(),
                audioCorrect: Joi.string().required(),
                audioWrong: Joi.string().required(),
                points: Joi.number().required(),
                question: Joi.object().keys({
                    answers: Joi.array().items(Joi.string()),
                    correctIndex: Joi.number().required(),
                    explanation: Joi.string().required()
                }).required()
            })).required(),

        quiz: Joi.array().items(
            Joi.object().keys({
                question: Joi.string().required(),
                points: Joi.number().required(),
                answers: Joi.array().items(Joi.string()),
                correctAnswer: Joi.string().required()
            })
        )
    });
    return schema.validate({
        title: data.title,
        author: data.author,
        series: data.series,
        language: data.language,
        starting: data.starting,
        cost: data.cost, // + my sanity
        difficulty: data.difficulty,
        imagePath: data.imagePath,

        creditTarget: data.creditTarget,
        tutorialAfterCompletion: data.tutorialAfterCompletion,
        description: data.description,

        textChunks: data.textChunks,
        quiz: data.quiz
    });

}

module.exports.Book = Book;
module.exports.bookValidation = bookValidation;