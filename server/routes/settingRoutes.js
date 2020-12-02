const router = require("express").Router();
const settingsController = require('../controllers/settingsController')
const auth = require('../middleware/auth.js');
const adminPermission = require("../middleware/adminPermission.js");

router
    .route('/')
    .get(async(req, res) => {
        await settingsController
            .getClientRelevantSettings()
            .then(result => res.status(200).send(result))
            .catch(reason => res.status(reason.code || 500).send(reason.message));
    });
router
    .route('/admin')
    .get([auth, adminPermission], async(req, res) => {
        await settingsController
            .getSettings()
            .then(result => res.status(200).send(result))
            .catch(reason => res.status(reason.code || 500).send(reason.message));
    })
    .put([auth, adminPermission], async(req, res) => {
        await settingsController
            .updateSettings(req.body)
            .then(result => res.status(200).send(result))
            .catch(reason => res.status(reason.code || 500).send(reason.message));
    });


module.exports = router;