const ObjectID = require('mongodb').ObjectID;
const axios = require('axios');
const bcrypt = require('bcryptjs');
const { User, userValidation } = require('../dbModels/user.js');
const SettingsController = require('./settingsController.js')
const emailValidation = require('../utils/emailValidation.js');
const idValidation = require('../utils/objectidValidation');

/**
 * Gets all users from the database
 */
async function getUsers() {
    return await User.find().select("-password");;
}
/**
 * RGets the user with the passed id
 * @param {string} id the id of the user we want to retrieve
 */
async function getUserById(id) {

    let { error } = idValidation(id);
    if (error)
        if (error) {
            let err = new Error(error.details[0].message);
            err.code = 400;
            throw err;
        }
    return await User.findById(id).select("-password");
}

/**
 * Gets the progress of the user with the passed email
 * @param {string} email the email of the user whose progress we want to retrieve
 */
async function getUserProgress(email) {

    let { error } = emailValidation(email);
    if (error) {
        let err = new Error(error.details[0].message);
        err.code = 400;
        throw err;
    }

    let result = await User.findOne({ email: email }).select('completedLevels');

    if (result === null) {
        let err = new Error("User not found");
        err.code = 404;
        throw err;
    }
    return result;
}

/**
 * Updates the user with the passed id with the passed data
 * @param {string} id the id of the user we want to update
 * @param {*} data the object with the new user data
 */
async function updateUser(id, data) {

    let { error } = userValidation(data);
    if (error) {
        let err = new Error(error.details[0].message);
        err.code = 400;
        throw err;
    }
    let updatedUser = await User.findByIdAndUpdate(new ObjectID(id), data).select("-password");

    if (updatedUser === null) {
        let err = new Error("User not found");
        err.code = 404;
        throw err;
    }

    return updatedUser;
}

/**
 * Creates a native user based on the passed data
 * @param {*} data the object with the user data
 */
async function createNativeUser(data) {

    let { error } = userValidation(data);
    if (error) {
        let err = new Error(error.details[0].message);
        err.code = 400;
        throw err;
    }

    let user = await User.findOne({ email: data.email });
    if (user) {
        let err = new Error("A User with this email already exists");
        err.code = 400;
        throw err;
    }
    data.isNativeAccount = true;

    const salt = await bcrypt.genSalt(10);
    data.password = await bcrypt.hash(data.password, salt);

    let newUser = new User(data);

    return await newUser.save() //.select("-password");

}

/**
 * Creates a remote user based on the passed data
 * @param {*} data the object with the user data
 */
async function createRemoteUser(data) {
    let { error } = userValidation(data);

    if (error) {
        let err = new Error(error.details[0].message);
        err.code = 400;
        throw err;
    }

    let user = await User.findOne({ email: data.email })
    if (user) {
        let err = new Error("User already exists");
        err.code = 400;
        throw err;
    }
    data.password = "no native password";
    data.isNativeUser = false;

    let newUser = new User(data);
    return await newUser.save()
}

exports.createNativeUser = createNativeUser;
exports.createRemoteUser = createRemoteUser;
exports.updateUser = updateUser;
exports.getUsers = getUsers;
exports.getUserById = getUserById;
exports.getUserProgress = getUserProgress;