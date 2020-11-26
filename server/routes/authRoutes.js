const router = require("express").Router();
const auth = require('../middleware/auth.js');
const authController = require('../controllers/authController.js');

//TODO Request to recording studio for authentification 
// !This is not safe, no real authentification happens!
router
    .route('/')
    .post(async(req, res) => {
        await authController
            .authenticate(req.body)
            .then(result => res.status(200).send(result))
            .catch(reason => res.status(reason.code || 500).send(reason.message));
    });

router
    .route('isAdmin')
    .get(auth, async(req, res) => {
        if (req.user.isAdmin) {
            res.status(200).send(true);
        } else {
            res.status(200).send(false);
        }
    })

module.exports = router;