const ObjectID = require('mongodb').ObjectID;
const { User, userValidation } = require('../dbModels/user.js');
const emailValidation = require('../utils/emailValidation.js');

async function getUsers() {
    return new Promise(async(resolve, reject) => {

        await User
            .find()
            .then(result => resolve(result))
            .catch((reason) => {
                console.log(reason);
                reject({ code: 500, msg: "internal server error" });
            });
    });
}

async function getUserById(id) {
    return new Promise(async(resolve, reject) => {

        await User
            .findById(new ObjectID(id))
            .then(result => resolve(result))
            .catch((reason) => {
                console.log(reason);
                reject({ code: 500, msg: "internal server error" });
            });
    });
}

async function getUserProgress(email) {
    return new Promise(async(resolve, reject) => {

        let { error } = emailValidation(email);
        if (error)
            reject({ code: 400, msg: error.details[0].message });

        await User
            .findOne({ email: email }).select('completedLevels')
            .then(result => {
                if (result === null) reject({ code: 404, msg: "User not found" });
                else {
                    resolve(result);
                }
            })
            .catch((reason) => {
                console.log(reason);
                reject({ code: 500, msg: "internal server error" });
            });
    })
}

async function updateUser(id, data) {

    return new Promise(async(resolve, reject) => {

        let { error } = userValidation(data);
        if (error)
            reject({ code: 400, msg: error.details[0].message });

        await User
            .findByIdAndUpdate(new ObjectID(id), data)
            .then(result => {
                if (result === null) reject({ code: 404, msg: "User not found" });
                else if (result === data) reject({ code: 400, msg: "No data updated" });
                else {
                    resolve(result);
                }
            })
            .catch((reason) => {
                console.log(reason);
                reject({ code: 500, msg: "internal server error" });
            });
    });
}

async function createUser(data) {

    return new Promise(async(resolve, reject) => {
        let { error } = userValidation(data);
        if (error) {
            reject({ code: 500, msg: error.details[0].message });
        }
        let user = await User.findOne({ email: data.email });
        if (user) {
            reject({ code: 400, msg: "User already exists" });
        }
        let newUser = new User(data);
        await newUser
            .save()
            .then(result => resolve(result))
            .catch((reason) => {
                console.log(reason);
                reject({ code: 500, msg: "internal server error" });
            });
    });
}

exports.createUser = createUser;
exports.updateUser = updateUser;
exports.getUsers = getUsers;
exports.getUserById = getUserById;
exports.getUserProgress = getUserProgress;