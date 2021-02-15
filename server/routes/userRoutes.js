var router = require("express").Router();
const userController = require('../controllers/userController.js');
const auth = require('../middleware/auth.js');
const settingsController = require('../controllers/settingsController');
const adminPermission = require("../middleware/adminPermission.js");

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
            .catch(reason => res.status(reason.code || 500).send(reason.message));
    });
router
    .route('/progress')
    .post(async(req, res) => {
        await userController
            .getUserProgress(req.body.email)
            .then(result => res.status(200).send(result))
            .catch(reason => res.status(reason.code || 500).send(reason.message));
    });
router
    .route('/')
    .get([auth, adminPermission], async(req, res) => {
        await userController
            .getUsers()
            .then(result => res.status(200).send(result))
            .catch(reason => res.status(reason.code || 500).send(reason.message));
    })
    .post([auth, adminPermission], async(req, res) => {
        if (!settingsController.getSettingsSync().bNativeAccountsActive)
            return res.status(401).send("Creation of a native account is currently not allowed!");

        await userController
            .createNativeUser(req.body)
            .then(result => {
                let token = result.generateAuthToken();
                res.status(200).header('x-auth-token', token).send(result);
            })
            .catch(reason => res.status(reason.code || 500).send(reason.message));
    })
    .put([auth, adminPermission], async(req, res) => {
        await userController
            .updateUser(req.body)
            .then(result => res.status(200).send(result))
            .catch(reason => res.status(reason.code || 500).send(reason.message));
    });
router
    .route('/:id')
    .get([auth, adminPermission], async(req, res) => {
        await userController
            .getUserById(req.params.id)
            .then(result => res.status(200).send(result))
            .catch(reason => res.status(reason.code || 500).send(reason.message));
    })


module.exports = router;