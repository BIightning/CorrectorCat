var router = require("express").Router();

const ObjectID = require('mongodb').ObjectID;
const { User, userValidation } = require('../dbModels/user.js');
const auth = require('../middleware/auth.js');

router
    .route('/me')
    .get(auth, async(req, res) => {
        let user = await User.findById(new ObjectID(req.user_id));
        res.status(200).send(user);
    });

router
    .route('/')
    .post(async(req, res) => {
        let { error } = userValidation(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        let user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).send("A User with this Email already exists");
        req.body.isAdmin = false;
        user = new User(req.body);
        user = await user.save();
        if (!user) return res.status(502).send("An internal error occured.");

        let token = user.generateAuthToken();
        res.status(200).header('x-auth-token', token).send(user);
    });


module.exports = router;
jau