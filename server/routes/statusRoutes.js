const router = require("express").Router();
const auth = require('../middleware/auth.js');
const adminPermission = require("../middleware/adminPermission.js");
const statusController = require("../controllers/statusController");

router
    .route('/db')
    .get(async(req, res) => {
        await statusController
            .getDatabaseStatus()
            .then(result => res.status(200).send(result))
            .catch(reason => res.status(reason.code).send(reason.msg));
    });

router
    .route('/remoteuser')
    .get(async(req, res) => {
        await statusController
            .getRemoteUserServerStatus()
            .then(result => res.status(200).send(result))
            .catch(reason => res.status(reason.code).send(reason.msg));
    });

module.exports = router;