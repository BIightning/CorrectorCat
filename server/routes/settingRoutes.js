const router = require("express").Router();
const settingsController = require('../controllers/settingsController')
const auth = require('../middleware/auth.js');
const adminPermission = require("../middleware/adminPermission.js");

router
    .route('/')
    .get([auth, adminPermission], async(req, res) => {
        await settingsController
            .getSettings()
            .then(result => res.status(200).send(result))
            .catch(reason => res.status(reason.code).send(reason.msg));
    })
    .put([auth, adminPermission], async(req, res) => {
        await settingsController
            .updateSettings()
            .then(result => res.status(200).send(result))
            .catch(reason => res.status(reason.code).send(reason.msg));
    });


module.exports = router;