const multer = require('multer');
const fs = require('fs');
const AppError = require('./appError');
const errors = require('../constants/errors');

const IMAGES_PATH = './uploads/image/';
const imageTypes = ['image/png', 'image/jpeg','image/jpg'];

const createFileName = (file, path) => {
    const type = file.originalname.split('.');
    const filename = `${new Date().getTime()}.${type[type.length - 1]}`;
    const filepath = path.slice(2) + filename;
    return [filename, filepath];
};

const imageStorage = multer.diskStorage({
    destination: (_, __, cb) => cb(null, IMAGES_PATH),
    filename: (req, file, cb) => {
        const [filename, filepath] = createFileName(file, IMAGES_PATH);
        // Set image path to requests body
        req.body.image = filepath;

        cb(null, filename);
    },
});

const imageFilter = function (req, file, cb) {
    if ((imageTypes.includes(file.mimetype))) {
        cb(null, true)
    } else cb(new AppError(400, errors.INVALID_FILE), false);
};


exports.uploadImage = multer({
    storage: imageStorage,
    fileFilter: imageFilter,
    limits: {fileSize: 5 * 1024 * 1024}
}).single('image');


exports.deleteFile = (path, next) => {
    try {
        fs.stat(path, (err) => {
            if (err) {
                return;
            }

            fs.unlink(path, (err) => {
                if (err) {
                    return console.log(err);
                }
            });
        });
    } catch (error) {
        next(new AppError(500, `Cannot delete file: ${path}`, false));
    }
};