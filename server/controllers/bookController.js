const ObjectID = require('mongodb').ObjectID;
const { Book, bookValidation } = require('../dbModels/book');
const idValidation = require('../utils/objectidValidation');

async function getBooks() {
    return new Promise(async(resolve, reject) => {
        await Book
            .find()
            .then(result => resolve(result))
            .catch(reason => reject({ code: 500, msg: 'internal server error!' }));
    });
}

async function getBookById(id) {
    return new Promise(async(resolve, reject) => {
        let { error } = idValidation(id);
        if (error)
            reject({ code: 400, msg: error.details[0].message });

        await Book
            .findById(id)
            .then(result => {
                if (result === null)
                    reject({ code: 404, msg: "Book not found" });
                else
                    resolve(result);
            })
            .catch(reason => {
                console.error(reason);
                reject({
                    code: 500,
                    msg: 'internal server error!'
                });
            });
    });
}

async function getBookByTitle(title) {
    return new Promise(async(resolve, reject) => {
        if (!title)
            reject({ code: 400, msg: 'No book title provided' });

        await Book
            .findOne({ title: title })
            .then(result => {
                if (result === null) reject({ code: 404, msg: "Book not found" });
                else
                    resolve(result);
            })
            .catch(reason => {
                console.log(reason);
                reject({ code: 500, msg: 'internal server error!' });
            });
    });
}

async function updateBook(id, data) {

    return new Promise(async(resolve, reject) => {
        //Validate data before accessing db
        let { idError } = idValidation(id);
        if (idError)
            reject({ code: 400, msg: idError.details[0].message });

        let { bookError } = bookValidation(data);
        if (bookError)
            reject({ code: 400, msg: bookError.details[0].message });

        await Book
            .findByIdAndUpdate(id, {
                title: data.title,
                author: data.author,
                series: data.series,
                language: data.language,
                starting: data.starting,
                cost: data.cost,
                difficulty: data.difficulty,
                imagePath: data.imagePath,
                description: data.description,
                textChunks: data.textChunks,
                quiz: data.quiz
            })
            .then(result => {
                if (result === null) reject({ code: 404, msg: "Book not found" });
                else if (result === data) reject({ code: 400, msg: "No data updated" });
                else {
                    resolve(result);
                }
            })
            .catch((reason) => {
                console.log(reason);
                reject({ code: 500, msg: "internal server error" });
            });
    });
}

async function createBook(data) {
    //Validate data before accessing db
    return new Promise(async(resolve, reject) => {
        let { error } = bookValidation(data);
        if (error)
            reject({ code: 400, msg: error.details[0].message });

        let newBook = new Book(data);
        await newBook
            .save()
            .then(result => resolve(result))
            .catch((reason) => {
                console.log(reason);
                reject({ code: 500, msg: "internal server error" });
            });
    });
}

exports.createBook = createBook;
exports.updateBook = updateBook;
exports.getBooks = getBooks;
exports.getBookById = getBookById;
exports.getBookByTitle = getBookByTitle;