//Nützliche Module
    var path = require('path');
    var fs = require('fs');

//Data File
    bookDataPath = path.join(__dirname, "bookData.json");


module.exports.getBooks = () => {
    data = fs.readFileSync(bookDataPath, 'utf-8');
    return JSON.parse(data);
}

module.exports.getBookByTitle = (title) => {
    books = this.getBooks();
    for(let i = 0; i < books.length; i++){
        if(books[i].title == title){
            return books[i];
        }
    }
}

module.exports.getBookById = (id) => {
    books = this.getBooks();
    for(let i = 0; i < books.length; i++){
        if(books[i].id == id){
            return books[i];
        }
    }
}

module.exports.addBook = (book) => {
    books = this.getBooks();
    let newId = 0;
    for(let i = 0; i < books.length; i++){
        if(books[i].id >= newId){
            newId = books[i].id +1;
        }
    }
    book.id = newId;
    books.push(book);
    writeData(books);

}

module.exports.deleteBook = (id) => {
    books = this.getBooks();
    for(let i = 0; i < books.length; i++){
        if(books[i].id == id){
            books.splice(i,1);
        } 
    }
    writeData(books);
}

module.exports.changeBook = (id, book) => {
    books = this.getBooks();
    for(let i = 0; i < books.length; i++){
        if(books[i].id == id){
            bid = books[i].id;
            books[i] = book;
            books[i].id = bid;
        } 
    }
    writeData(books);
}


function writeData(data){
    fs.writeFileSync(bookDataPath, JSON.stringify(data), 'utf-8' );
}