const router = require("express").Router();
const FileController = require('../controllers/fileController.js');
const auth = require('../middleware/auth.js');
const adminPermission = require("../middleware/adminPermission.js");
const fs = require("fs");

router
    .route('/')
    .post([auth, adminPermission, FileController.fileUpload.single('file')], async(req, res) => {
        if (!req.file) {
            return res.status(500).send({ msg: 'Upload failed.' });
        } else {
            let fileMeta = {
                fileUrl: req.file.path,
                fileName: req.file.filename,
                fileType: req.filetype,
                ownerId: req.body.ownerId
            }
            await FileController
                .saveFileInformation(fileMeta)
                .then(result => res.status(200).send(result))
                .catch(reason => {
                    console.log(reason);
                    fs.unlink(req.file.path, () => {});
                    res.status(reason.code).send(reason.msg);
                });
        }
    })
    .get(async(req, res) => {
        await FileController
            .getFileCatalog()
            .then(result => res.status(200).send(result))
            .catch(reason => {
                console.log(reason);
                res.status(reason.code).send(reason.msg);
            });
    })

router
    .route('/audio')
    .get(async(req, res) => {
        await FileController
            .getAudioCatalog()
            .then(result => res.status(200).send(result))
            .catch(reason => {
                console.log(reason);
                res.status(reason.code).send(reason.msg);
            });
    })

router
    .route('/images')
    .get(async(req, res) => {
        await FileController
            .getImageCatalog()
            .then(result => res.status(200).send(result))
            .catch(reason => {
                console.log(reason);
                res.status(reason.code).send(reason.msg);
            });
    })
router
    .route('/:id')
    .get(async(req, res) => {
        await FileController
            .getFileCatalogOfOwner(req.params.id)
            .then(result => res.status(200).send(result))
            .catch(reason => {
                console.log(reason);
                res.status(reason.code).send(reason.msg);
            });
    })
router
    .route('/multiple')
    .post([auth, adminPermission, FileController.fileUpload.array('file', 60)], async(req, res) => {
        if (!req.files) {
            return res.status(500).send({ message: 'Upload failed' });
        }
        let fileMetas = [];
        for (let file of req.files) {
            let fileMeta = {
                fileUrl: file.path,
                fileName: file.filename,
                fileType: req.filetype,
                ownerId: req.body.ownerId
            }
            await FileController
                .saveFileInformation(fileMeta)
                .then(result => {
                    fileMetas.push(result);
                })
                .catch(reason => {
                    fs.unlink(file.fileUrl);
                    res.status(200).send(fileMetas);
                    res.status(reason.code).send('Something went wrong. Not all files were uploaded.');
                    return;
                });
        }
        res.status(200).send(fileMetas)
    })


module.exports = router;