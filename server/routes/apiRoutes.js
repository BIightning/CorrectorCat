var router = require("express").Router();

router.use('/users', require('./userRoutes.js'));
router.use('/auth', require('./authRoutes.js'))
router.use('*', (req, res) => res.status(404).send("API endpoint does not exist"));

module.exports = router;