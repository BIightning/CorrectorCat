const { Book, bookValidation } = require('../dbModels/book');
const idValidation = require('../utils/objectidValidation');

/**
 * Retrieves all existing books from the database
 */
async function getBooks() {

    const books = await Book.find();
    return books;

}

/**
 * Looks for a book with the given id and returns it.
 * @param {string} id The object id of the book we want to retrieve
 */
async function getBookById(id) {
    let { error } = idValidation(id);
    if (error) {
        let err = new Error(error.details[0].message);
        err.code = 400;
        throw err;
    }

    const book = await Book.findById(id);

    if (book === null) {
        let err = new Error("Book not found");
        err.code = 404;
        throw err;
    } else
        return book;

}

/**
 * Looks for a book with the given title and returns it.
 * @deprecated avoid usage, book names aren't necessarily unique
 * @param {string} title The title of the book we want to retrieve
 */

async function getBookByTitle(title) {
    if (!title || typeof(title) !== 'string') {
        let err = new Error('Title not provided or not a string');
        err.code = 400;
        throw err;
    }

    const book = await Book.findOne({ title: title });

    if (book === null) {
        let err = new Error("Book not found");
        err.code = 404;
        throw err;
    } else
        return book;
}

/**
 * Looks for a book with the given id and updates it with the given data
 * @param {string} id The object id of the book we want to update
 * @param {*} data the data we want to update the book with
 */
async function updateBook(id, data) {

    //Validate data before accessing db
    let { idError } = idValidation(id);
    if (idError) {
        let err = new Error(idError.details[0].message);
        err.code = 400;
        throw err;
    }

    let { bookError } = bookValidation(data);
    if (bookError) {
        let err = new Error(bookError.details[0].message);
        err.code = 400;
        throw err;
    }

    const book = await Book.findByIdAndUpdate(id, {
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
    });
    if (book === null) {
        let err = new Error("Book not found");
        err.code = 404;
        throw err;
    } else if (book === data) {
        let err = new Error("No data updated");
        err.code = 400;
        throw err;
    } else
        return book;
}

/**
 * Creates a new book with the given data
 * @param {*} data the data we want to create the book with
 */
async function createBook(data) {

    let { error } = bookValidation(data);
    if (error) {
        let err = new Error(error.details[0].message);
        err.code = 400;
        throw err;
    }

    let newBook = new Book(data);
    newBook = await newBook.save();
    return newBook;
}

/**
 * Looks for a book with the given id and deletes it permamently
 * @param {string} id The object id of the book we want to delete
 */
async function deleteBook(id) {
    let { error } = idValidation(id);
    if (error) {
        let err = new Error(error.details[0].message);
        err.code = 400;
        throw err;
    }
    let book = await Book.findByIdAndRemove(id);
    if (book === null) {
        let err = new Error("Book not found");
        err.code = 404;
        throw err;
    }

    return book;
}

exports.createBook = createBook;
exports.updateBook = updateBook;
exports.getBooks = getBooks;
exports.getBookById = getBookById;
exports.getBookByTitle = getBookByTitle;
exports.deleteBook = deleteBook;