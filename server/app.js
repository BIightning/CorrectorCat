//Express
var express = require('express');
var app = express();
var PORT = 8080;

//Usefull Modules
var path = require('path');
var ctlUser = require('./users/ctlUsers');
var ctlBook = require('./books/ctlBooks');


//Bodyparser
var bodyParser = require('body-parser')
    // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
    // parse application/json
app.use(bodyParser.json())

//Angular App
app.use('/', express.static(path.join(__dirname, "../dist/correctorcat")));

//Allow CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE');
    next();
});


//Server Ports

//Login

//By Username and Password

app.post("/api/login", (req, res) => {
    user = req.body;
    users = ctlUser.getUsers();
    for (let i = 0; i < users.length; i++) {
        if (users[i].email == user.username) {
            if (users[i].password == user.password) {
                res.json({
                    userId: users[i].id,
                    isFound: true,
                    msg: "User Found"
                });
            } else {
                res.json({
                    userId: NaN,
                    isFound: false,
                    msg: "Wrong Password"
                });
            }
        }
    }
    res.json({
        userId: NaN,
        isFound: false,
        msg: "User not found"
    });
});

//By Id
app.get("/api/login/:id", (req, res) => {
    let id = req.params.id;
    let users = ctlUser.getUsers();
    for (let i = 0; i < users.length; i++) {
        if (users[i].id == id) {
            res.json({
                userId: id,
                isFound: true,
                msg: "User found"
            });
        }
    }
    res.json({
        userId: NaN,
        isFound: false,
        msg: "User not found"
    });
});

//User API
app.post("/api/user", (req, res) => {
    user = req.body;
    users = ctlUser.getUsers();
    let collison = false;
    for (let i = 0; i < users.length; i++) {
        if (users[i].email == user.email) {
            res.json({
                isCreated: false,
                msg: "User Exist"
            });
            collison = true;
        }
    }
    if (!collison) {
        ctlUser.writeUser(user);
        res.json({
            isCreated: true,
            msg: "User Created"
        });
    }
});

app.get("/api/userById/:id", (req, res) => {
    res.send(ctlUser.getUserById(req.params.id));
});

app.get("/api/userByUserName/:userName", (req, res) => {
    res.send(ctlUser.getUserByEmail(req.params.userName));
});

app.delete("/api/user/:id", (req, res) => {
    res.send(ctlUser.deleteUser(req.params.id));
});

app.put("/api/user/:id", (req, res) => {
    ctlUser.changeUser(req.params.id, req.body);
    res.json({
        isUpdated: true,
        msg: "User Updated"
    });
});

// Books API

app.get("/api/bookById/:id", (req, res) => {
    res.send(ctlBook.getBookById(req.params.id));
});

app.get("/api/bookByTitle/:title", (req, res) => {
    res.send(ctlBook.getBookByTitle(req.params.title));
});

app.get("/api/books", (req, res) => {
    res.send(ctlBook.getBooks(req.params))
})

app.post("/api/book/", (req, res) => {
    res.send(ctlBook.addBook(req.body));
})

app.delete("/api/book/:id", (req, res) => {
    res.send(ctlBook.deleteBook(req.params.id));
});

app.put("/api/book/:id", (req, res) => {
    res.send(ctlBook.changeBook(req.params.id, req.body));
});


app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));