var router = require("express").Router();
const userController = require('../controllers/userController.js');
const auth = require('../middleware/auth.js');

router
    .route('/me')
    .get(auth, async(req, res) => {
        if (req.error) {
            res.status(req.error.code).send(req.error.msg);
            return;
        }
        await userController
            .getUserById(req.user._id)
            .then(result => res.status(200).send(result))
            .catch(reason => res.status(reason.code).send(reason.msg));
    });
router
    .route('/progress')
    .post(async(req, res) => {
        await userController
            .getUserProgress(req.body.email)
            .then(result => res.status(200).send(result))
            .catch(reason => res.status(reason.code).send(reason.msg));
    });
router
    .route('/')
    .post(async(req, res) => {
        await userController
            .createUser(req.body)
            .then(result => {
                let token = result.generateAuthToken();
                res.status(200).header('x-auth-token', token).send(result);
            })
            .catch(reason => res.status(reason.code).send(reason.msg));
    });


module.exports = router;