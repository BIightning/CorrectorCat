const bookController = require('../controllers/bookController.js');
const auth = require('../middleware/auth.js');
const router = require("express").Router();
const adminPermission = require("../middleware/adminPermission");

router
    .route('/')
    .get(async(req, res) => {
        await bookController
            .getBooks()
            .then(result => res.status(200).send(result))
            .catch(reason => res.status(reason.code).send(reason.msg));
    })
    .post(async(req, res) => {
        await bookController
            .createBook(req.body)
            .then(result => res.status(200).send(result))
            .catch(reason => res.status(reason.code).send(reason.msg));
    });
router
    .route('/bytitle')
    .get(async(req, res) => {
        await bookController
            .getBookByTitle(req.body.title)
            .then(result => res.status(200).send(result))
            .catch(reason => res.status(reason.code).send(reason.msg));
    });
router
    .route('/:id')
    .get(async(req, res) => {
        await bookController
            .getBookById(req.params.id)
            .then(result => res.status(200).send(result))
            .catch(reason => res.status(reason.code).send(reason.msg));
    })
    .put([auth, adminPermission], async(req, res) => {
        await bookController
            .updateBook(req.params.id, req.body)
            .then(result => res.status(200).send(result))
            .catch(reason => res.status(reason.code).send(reason.msg));
    });
module.exports = router;