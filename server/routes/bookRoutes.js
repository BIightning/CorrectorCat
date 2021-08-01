const router = require("express").Router();
const bookController = require('../controllers/bookController.js');
const auth = require('../middleware/auth.js');
const adminPermission = require("../middleware/adminPermission.js");

router
    .route('/')
    .get(async(req, res) => {
        await bookController
            .getBooks()
            .then(result => res.status(200).send(result))
            .catch(reason => res.status(reason.code || 500).send(reason.message));
    })
    .post([auth, adminPermission], async(req, res) => {
        await bookController
            .createBook(req.body)
            .then(result => res.status(200).send(result))
            .catch(reason => res.status(reason.code || 500).send(reason.message));
    });
router
    .route('/bytitle/:title')
    .get(async(req, res) => {
        await bookController
            .getBookByTitle(req.params.title)
            .then(result => res.status(200).send(result))
            .catch(reason => res.status(reason.code || 500).send(reason.message));
    });
router
    .route('/:id')
    .get(async(req, res) => {
        await bookController
            .getBookById(req.params.id)
            .then(result => res.status(200).send(result))
            .catch(reason => res.status(reason.code || 500).send(reason.message));
    })
    .put([auth, adminPermission], async(req, res) => {
        await bookController
            .updateBook(req.params.id, req.body)
            .then(result => res.status(200).send(result))
            .catch(reason => res.status(reason.code || 500).send(reason.message));
    })
    .delete([auth, adminPermission], async(req, res) => {
        await bookController
            .deleteBook(req.params.id)
            .then(result => res.status(200).send(result))
            .catch(reason => res.status(reason.code || 500).send(reason.message));
    });

module.exports = router;