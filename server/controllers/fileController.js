const { File, fileValidation } = require("../dbModels/file");
const multer = require('multer');
const fs = require('fs');
/**
 * Returns data base entries of all files
 * regardless of owner or file type.
 * !Does not return the actual files!
 */
function getFileCatalog() {
    return new Promise(async(resolve, reject) => {
        await File
            .find()
            .then(result => resolve(result))
            .catch(reason => {
                console.error(reason);
                reject({
                    code: 500,
                    msg: 'internal server error!'
                });
            });
    })
}
/**
 * Returns data base entries of all files (regardless of filetype) 
 * possessed by the owner with the passed id.
 * !Does not return the actual files!
 * @param _ownerId objectId of the file owner
 */
function getFileCatalogOfOwner(_ownerId) {
    return new Promise(async(resolve, reject) => {
        await File
            .find({ ownerId: _ownerId })
            .then(result => resolve(result))
            .catch(reason => {
                console.error(reason);
                reject({
                    code: 500,
                    msg: 'internal server error!'
                });
            });
    })
}
/**
 * Returns data base entries of all image files
 * regardless of owner.
 * !Does not return the actual files!
 */
function getImageCatalog() {
    return new Promise(async(resolve, reject) => {
        await File
            .find({ fileType: 'image' })
            .then(result => resolve(result))
            .catch(reason => {
                console.error(reason);
                reject({
                    code: 500,
                    msg: 'internal server error!'
                });
            });
    })
}
/**
 * Returns data base entries of all image files possessed by
 * the owner with the passed id.
 * !Does not return the actual files!
 * @param _ownerId objectId of the file owner
 */
function getImageCatalogOfOwner(_ownerId) {
    return new Promise(async(resolve, reject) => {
        await File
            .find({ fileType: 'image', ownerId: _ownerId })
            .then(result => resolve(result))
            .catch(reason => {
                console.error(reason);
                reject({
                    code: 500,
                    msg: 'internal server error!'
                });
            });
    })
}
/**
 * Returns data base entries of all audio files
 * regardless of owner.
 * !Does not return the actual files!
 */
function getAudioCatalog() {
    return new Promise(async(resolve, reject) => {
        await File
            .find({ fileType: 'audio' })
            .then(result => resolve(result))
            .catch(reason => {
                console.error(reason);
                reject({
                    code: 500,
                    msg: 'internal server error!'
                });
            });
    })
}
/**
 * Returns data base entries of all audio files possessed by
 * the owner with the passed id.
 * !Does not return the actual files!
 * @param _ownerId objectId of the file owner
 */
function getAudioCatalogOfOwner(_ownerId) {
    return new Promise(async(resolve, reject) => {
        await File
            .find({ fileType: 'audio', ownerId: _ownerId })
            .then(result => resolve(result))
            .catch(reason => {
                console.error(reason);
                reject({
                    code: 500,
                    msg: 'internal server error!'
                });
            });
    })
}
/**
 * Creates a new database entry with 
 * the owner with the passed id.
 * !Does not return the actual files!
 * @param fileMeta object containing filename, path, owner id and filetype
 */
function saveFileInformation(fileMeta) {
    return new Promise(async(resolve, reject) => {
        let { error } = fileValidation(fileMeta)
        if (error)
            reject({ code: 400, msg: error.details[0].message });

        let newFile = new File({
            fileUrl: fileMeta.fileUrl,
            fileName: fileMeta.fileName,
            fileType: fileMeta.fileType,
            ownerId: fileMeta.ownerId
        });
        await newFile
            .save()
            .then(result => resolve(result))
            .catch((reason) => {
                console.log(reason);
                reject({ code: 500, msg: "internal server error" });
            });
    })
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
 * @param file The file whose type is to be determined
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