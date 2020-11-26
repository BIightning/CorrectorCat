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
 * @param id The object id of the book we want to retrieve
 */
async function getBookById(id) {
    let { error } = idValidation(id);
    if (error)
        throw new Error({ code: 400, msg: error.details[0].message });

    const book = await Book.findById(id);

    if (book === null)
        throw new Error({ code: 404, msg: "Book not found" });
    else
        return book;

}

/**
 * Looks for a book with the given title and returns it.
 * @deprecated avoid usage, book names aren't necessarily unique
 * @param title The title of the book we want to retrieve
 */

async function getBookByTitle(title) {
    if (!title)
        throw new Error({ code: 400, msg: 'No book title provided' });

    const book = await Book.findOne({ title: title });

    if (book === null)
        throw new Error({ code: 404, msg: "Book not found" });
    else
        return book;
}

/**
 * Looks for a book with the given id and updates it with the given data
 * @param id The object id of the book we want to update
 * @param data the data we want to update the book with
 */
async function updateBook(id, data) {

    //Validate data before accessing db
    let { idError } = idValidation(id);
    if (idError)
        throw new Error({ code: 400, msg: idError.details[0].message });

    let { bookError } = bookValidation(data);
    if (bookError)
        throw new Error({ code: 400, msg: bookError.details[0].message });

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
    if (book === null) throw new Error({ code: 404, msg: "Book not found" });
    else if (book === data) throw new Error({ code: 400, msg: "No data updated" });
    else
        return book;
}

/**
 * Creates a new book with the given data
 * @param data the data we want to create the book with
 */
async function createBook(data) {

    let { error } = bookValidation(data);
    if (error)
        throw new Error({ code: 400, msg: error.details[0].message });

    let newBook = new Book(data);
    newBook = await newBook.save();
    return newBook;
}

/**
 * Looks for a book with the given id and deletes it permamently
 * @param id The object id of the book we want to delete
 */
async function deleteBook(id) {
    let { error } = idValidation(id);
    if (error)
        throw new Error({ code: 400, msg: error.details[0].message });
    let book = await Book.findByIdAndRemove(id);
    if (book === null)
        throw new Error({ code: 404, msg: "Book not found" });

    return book;
}

exports.createBook = createBook;
exports.updateBook = updateBook;
exports.getBooks = getBooks;
exports.getBookById = getBookById;
exports.getBookByTitle = getBookByTitle;
exports.deleteBook = deleteBook;