var router = require("express").Router();

router.use('/settings', require('./settingRoutes.js'));
router.use('/books', require('./bookRoutes.js'));
router.use('/tutorials', require('./tutorialRoutes.js'));
router.use('/users', require('./userRoutes.js'));
router.use('/auth', require('./authRoutes.js'))
router.use('/status', require('./statusRoutes.js'));
router.use('/files', require('./fileRoutes.js'))
router.use('*', (req, res) => res.status(404).send("API endpoint does not exist"));

module.exports = router;