const { File, fileValidation } = require("../dbModels/file");
const multer = require('multer');
const fs = require('fs');
const idValidation = require("../utils/objectidValidation");

/**
 * Returns data base entries of all files
 * regardless of owner or file type.
 * !Does not return the actual files!
 */
async function getFileCatalog() {
    return await File.find();
}
/**
 * Returns data base entries of all files (regardless of filetype) 
 * possessed by the owner with the passed id.
 * !Does not return the actual files!
 * @param {string} _ownerId objectId of the file owner
 */
async function getFileCatalogOfOwner(_ownerId) {

    let { error } = idValidation(_ownerId);
    if (error) {
        let err = new Error(error.details[0].message);
        err.code = 400;
        throw err;
    }

    return await File.find({ ownerId: _ownerId });
}

/**
 * Returns data base entries of all image files
 * regardless of owner.
 * !Does not return the actual files!
 */
async function getImageCatalog() {
    return await File.find({ fileType: 'image' })

}

/**
 * Returns data base entries of all image files possessed by
 * the owner with the passed id.
 * !Does not return the actual files!
 * @param {string}  _ownerId objectId of the file owner
 */
async function getImageCatalogOfOwner(_ownerId) {
    let { error } = idValidation(ownerId);
    if (error) {
        let err = new Error(error.details[0].message);
        err.code = 400;
        throw err;
    }

    return await File.find({ fileType: 'image', ownerId: _ownerId })

}

/**
 * Returns data base entries of all audio files
 * regardless of owner.
 * !Does not return the actual files!
 */
async function getAudioCatalog() {
    return await File.find({ fileType: 'audio' });
}


/**
 * Returns data base entries of all audio files possessed by
 * the owner with the passed id.
 * !Does not return the actual files!
 * @param {string} _ownerId objectId of the file owner
 */
async function getAudioCatalogOfOwner(_ownerId) {

    let { error } = idValidation(ownerId);
    if (error) {
        let err = new Error(error.details[0].message);
        err.code = 400;
        throw err;
    }

    await File.find({ fileType: 'audio', ownerId: _ownerId })

}


/**
 * Creates a new database entry with 
 * the owner with the passed id.
 * !Does not return the actual files!
 * @param {object} fileMeta object containing filename, path, owner id and filetype
 */
async function saveFileInformation(fileMeta) {

    let { error } = fileValidation(fileMeta)
    if (error) {
        let err = new Error(error.details[0].message);
        err.code = 400;
        throw err;
    }

    let newFile = new File({
        fileUrl: fileMeta.fileUrl,
        fileName: fileMeta.fileName,
        fileType: fileMeta.fileType,
        ownerId: fileMeta.ownerId
    });
    return await newFile.save()
}

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let filepath = `./uploads/${req.ownerId}`;
        ensureFolderExistance(filepath, (err) => {
            if (err)
                throw new Error(`Error while creating folder!`);
        });

        req.filetype = 'image';
        let fileEnding = determineFileEnding(file);
        if (!fileEnding)
            throw new Error(`unsupported filetype: ${file.mimetype}`);

        if (fileEnding === '.mp3') {
            req.filetype = 'audio';
        }
        cb(null, filepath);
    },
    filename: (req, file, cb) => {
        let fileEnding = determineFileEnding(file);
        if (!fileEnding)
            throw new Error(`unsupported filetype: ${file.mimetype}`);
        cb(null, `${file.originalname}`);
    }
});


/**
 * Tries to create a new folder at the passed path. 
 * If folder already exists nothing happens.
 * @param {string} path The path for the folder to create
 * @param {*} cb Callback. returns null on success
 */
function ensureFolderExistance(path, cb) {
    fs.mkdir(path, function(err) {
        if (err) {
            if (err.code == 'EEXIST') cb(null); // ignore the error if the folder already exists
            else cb(err); // something else went wrong
        } else cb(null); // successfully created folder
    });
}


/**
 * Determines the filetype of the passed file and returns
 * the correct file ending as a string.
 * Returns null if filetype is unsupported.
 * Supported filetypes: gif png jpeg mp3
 * @param {object} file The file whose type is to be determined
 */
function determineFileEnding(file) {
    let fileEnding = null;
    switch (file.mimetype) {
        case 'audio/mp3':
            fileEnding = '.mp3';
            break;
        case 'audio/mpeg':
            fileEnding = '.mp3';
            break;
        case 'image/gif':
            fileEnding = '.gif';
            break;
        case 'image/png':
            fileEnding = '.png';
            break;
        case 'image/jpeg':
            fileEnding = '.jpeg';
            break;
    }
    return fileEnding;
}

module.exports.fileUpload = multer({ storage: storage });
module.exports.saveFileInformation = saveFileInformation;
//Getters regardless of owner
module.exports.getFileCatalog = getFileCatalog;
module.exports.getAudioCatalog = getAudioCatalog;
module.exports.getImageCatalog = getImageCatalog;
//Getters for data of a specific owner
module.exports.getFileCatalogOfOwner = getFileCatalogOfOwner;
module.exports.getAudioCatalogOfOwner = getAudioCatalogOfOwner;
module.exports.getImageCatalogOfOwner = getImageCatalogOfOwner;