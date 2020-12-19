const { Tutorial, tutorialValidation } = require('../dbModels/tutorial.js');
const idValidation = require('../utils/objectidValidation.js');

/**
 * Retrieves all existing tutorials from database
 */
async function getTutorials() {
    return await Tutorial.find()
}

/**
 * Retrieves the tutorial with the passed id
 * @param {string} id The id of the tutorial we want to retrieve
 */
async function getTutorialById(id) {
    let { error } = idValidation(id);
    if (error) {
        let err = new Error(error.details[0].message);
        err.code = 400;
        throw err;
    }

    let result = await Tutorial.findById(id);

    if (result === null) {
        let err = new Error("Tutorial does not exist");
        err.code = 404;
        throw err;
    } else
        return result;
}

/**
 * Retrieves the tutorial with the passed position
 * @deprecated tutorial position will be swapped for id saved in app settings
 * @param {number} position the position of the tutorial we want to retrieve
 */
async function getTutorialByPosition(position) {
    let result = await Tutorial.findOne({ position: position });

    if (result === null) {
        let err = new Error("Tutorial does not exist");
        err.code = 404;
        throw err;
    }
    return result;

}

/**
 * 
 * @param {string} id the objectID of the tutorial we want to update
 * @param {object} data The data we 
 */
async function updateTutorial(id, data) {

    //Validate data before accessing db
    let { idError } = idValidation(id);
    if (idError) {
        let err = new Error(error.details[0].message);
        err.code = 400;
        throw err;
    }

    let { tutorialError } = tutorialValidation(data);
    if (tutorialError) {
        let err = new Error(tutorialError.details[0].message);
        err.code = 400;
        throw err;
    }

    let result = await Tutorial.findByIdAndUpdate(id, data)

    if (result === null) {
        let err = new Error("Tutorial does not exist");
        err.code = 404;
        throw err;
    } else if (result === data) {
        let err = new Error("No data updated");
        err.code = 400;
        throw err;
    } else
        return result;
}

async function createTutorial(data) {
    //Validate data before accessing db
    let { error } = tutorialValidation(data);
    if (error) {
        let err = new Error(tutorialError.details[0].message);
        err.code = 400;
        throw err;
    }

    let newTutorial = new Tutorial(data);
    return await newTutorial.save()

}

async function deleteTutorial(id) {
    let { error } = idValidation(id);
    if (error) {
        let err = new Error(tutorialError.details[0].message);
        err.code = 400;
        throw err;
    }

    let result = await Tutorial.findByIdAndRemove(id);

    if (result === null) {
        let err = new Error("Tutorial does not exist");
        err.code = 404;
        throw err;
    }

    return result;
}

exports.createTutorial = createTutorial;
exports.updateTutorial = updateTutorial;
exports.deleteTutorial = deleteTutorial;
exports.getTutorials = getTutorials;
exports.getTutorialById = getTutorialById;
exports.getTutorialByPosition = getTutorialByPosition;