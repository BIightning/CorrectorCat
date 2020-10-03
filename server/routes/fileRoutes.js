const router = require("express").Router();
const fileController = require('../controllers/fileController.js');
const auth = require('../middleware/auth.js');
const adminPermission = require("../middleware/adminPermission.js");
const fs = require("fs");
const { route } = require("./bookRoutes.js");

router
    .route('/')
    .post([auth, adminPermission, fileController.fileUpload.single('file')], async(req, res) => {
        if (!req.file) {
            return res.status(500).send({ message: 'Upload fail' });
        } else {
            let fileInfo = {
                fileUrl: req.file.path,
                fileName: req.file.filename,
                fileType: req.filetype,
                ownerId: '5f56f3ccbe1da85cec4650e8'
            }
            await fileController
                .saveFileInformation(fileInfo)
                .then(result => res.status(200).send(result))
                .catch(reason => {
                    console.log(reason);
                    fs.unlink(req.file.path, () => {});
                    res.status(reason.code).send(reason.msg);
                });
        }
    });

router
    .route('/multiple')
    .post([auth, adminPermission, fileController.fileUpload.array('files')], async(req, res) => {
        if (!req.files) {
            return res.status(500).send({ message: 'Upload failed' });
        }
        let fileMetas = [];
        for (let file of req.files) {
            let fileMeta = {
                fileUrl: file.path,
                fileName: file.filename,
                fileType: 'test',
                ownerId: '5f56f3ccbe1da85cec4650e8'
            }
            await fileController
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