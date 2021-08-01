const router = require("express").Router();
const tutorialController = require('../controllers/tutorialController.js');
const auth = require('../middleware/auth.js');
const adminPermission = require("../middleware/adminPermission.js");

router
    .route('/')
    .get(async(req, res) => {
        await tutorialController
            .getTutorials()
            .then(result => res.status(200).send(result))
            .catch(reason => res.status(reason.code || 500).send(reason.message));
    })
    .post(async(req, res) => {
        await tutorialController
            .createTutorial(req.body)
            .then(result => res.status(200).send(result))
            .catch(reason => res.status(reason.code || 500).send(reason.message));
    });
router
    .route('/byposition/:position')
    .get(async(req, res) => {
        await tutorialController
            .getTutorialByPosition(req.params.position)
            .then(result => res.status(200).send(result))
            .catch(reason => res.status(reason.code || 500).send(reason.message));
    });
router
    .route('/:id')
    .get(async(req, res) => {
        await tutorialController
            .getTutorialById(req.params.id)
            .then(result => res.status(200).send(result))
            .catch(reason => res.status(reason.code || 500).send(reason.message));
    })
    .put([auth, adminPermission], async(req, res) => {
        await tutorialController
            .updateTutorial(req.params.id, req.body)
            .then(result => res.status(200).send(result))
            .catch(reason => res.status(reason.code || 500).send(reason.message));
    })
    .delete([auth, adminPermission], async(req, res) => {
        await tutorialController
            .deleteTutorial(req.params.id)
            .then(result => res.status(200).send(result))
            .catch(reason => res.status(reason.code || 500).send(reason.message));
    });

module.exports = router;