const fs = require('fs');
const multer = require('multer');
const uuidv1 = require('uuid/v1');
const express = require('express');
const sharp = require('sharp');

const UPLOAD_PATH_FULL = '/data/uploads';
const UPLOAD_PATH_SHORT = '/uploads';

const uploadPath = {
    full: UPLOAD_PATH_FULL,
    short: UPLOAD_PATH_SHORT
};

const getFileFormat = (fileName) => {
    return fileName.match(/\.\w+$/i)[0];
};

const storage = multer.diskStorage({
    destination: (request, file, cb) => {
        cb(null, uploadPath.full);
    },
    filename: (request, file, cb) => {
        cb(null, uuidv1() + getFileFormat(file.originalname));
    }
});

fs.stat(uploadPath.full, async (err) => {
    if (err) {
        fs.mkdirSync(uploadPath.full, { recursive: true }, err => {
            if (err) {
                throw err;
            }
        });
    }
});

module.exports = app => {
    app.put('/upload', multer({ storage: storage }).single('avatar'), (request, response) => {
        const fileName = request.file.filename;

        if (request.query.crop === 'true') {
            sharp(uploadPath.full + '/' + fileName)
                .resize(300, 300)
                .toFile(uploadPath.full + '/thumbnail.' + fileName)
                .then(info => {
                    response.send(JSON.stringify({
                        path: uploadPath.short + '/thumbnail.' + fileName
                    }));
                })
                .catch(err => {
                    // console.log(err);
                });
        } else {
            response.send(JSON.stringify({
                path: uploadPath.short  + '/' + fileName
            }));
        }
    });
    app.use(express.static('/data'));
};
