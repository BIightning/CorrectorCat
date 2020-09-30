const { Tutorial, tutorialValidation } = require('../dbModels/tutorial.js');
const idValidation = require('../utils/objectidValidation.js');

async function getTutorials() {
    return new Promise(async(resolve, reject) => {
        await Tutorial
            .find()
            .then(result => resolve(result))
            .catch(reason => reject({ code: 500, msg: 'internal server error!' }));
    });
}

async function getTutorialById(id) {
    return new Promise(async(resolve, reject) => {
        let { error } = idValidation(id);
        if (error)
            reject({ code: 400, msg: error.details[0].message });

        await Tutorial
            .findById(id)
            .then(result => {
                if (result === null) reject({ code: 404, msg: "Tutorial not found" });
                else
                    resolve(result);
            })
            .catch(reason => {
                console.error(reason);
                reject({
                    code: 500,
                    msg: 'internal server error!'
                });
            });
    });
}
async function getTutorialByPosition(position) {
    return new Promise(async(resolve, reject) => {
        await Tutorial
            .findOne({ position: position })
            .then(result => {
                if (result === null) reject({ code: 404, msg: "Tutorial not found" });
                else
                    resolve(result);
            })
            .catch(reason => {
                console.error(reason);
                reject({
                    code: 500,
                    msg: 'internal server error!'
                });
            });
    });
}
async function updateTutorial(id, data) {

    return new Promise(async(resolve, reject) => {
        //Validate data before accessing db
        let { idError } = idValidation(id);
        if (idError)
            reject({ code: 400, msg: idError.details[0].message });

        let { tutorialError } = tutorialValidation(data);
        if (tutorialError)
            reject({ code: 400, msg: tutorialError.details[0].message });

        await Tutorial
            .findByIdAndUpdate(id, data)
            .then(result => {
                if (result === null) reject({ code: 404, msg: "Tutorial not found" });
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

async function createTutorial(data) {
    //Validate data before accessing db
    return new Promise(async(resolve, reject) => {
        let { error } = tutorialValidation(data);
        if (error)
            reject({ code: 400, msg: error.details[0].message });

        let newTutorial = new Tutorial(data);
        await newTutorial
            .save()
            .then(result => resolve(result))
            .catch((reason) => {
                console.log(reason);
                reject({ code: 500, msg: "internal server error" });
            });
    });
}

async function deleteTutorial(id) {
    return new Promise(async(resolve, reject) => {
        let { error } = idValidation(id);
        if (error)
            reject({ code: 400, msg: error.details[0].message });
        await Tutorial
            .findByIdAndRemove(id)
            .then(result => resolve(result))
            .catch((reason) => {
                console.log(reason);
                reject({ code: 500, msg: "internal server error" });
            });
    })
}

exports.createTutorial = createTutorial;
exports.updateTutorial = updateTutorial;
exports.deleteTutorial = deleteTutorial;
exports.getTutorials = getTutorials;
exports.getTutorialById = getTutorialById;
exports.getTutorialByPosition = getTutorialByPosition;