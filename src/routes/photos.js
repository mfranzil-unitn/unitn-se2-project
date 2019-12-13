const { Router } = require('express');

const multer = require('multer');
const crypto = require('crypto');
const path = require('path');

const UserService = require('@app/services/users');

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function (req, file, cb) {
        crypto.pseudoRandomBytes(16, function (err, raw) {
            if (err) { return cb(err); }
            cb(null, raw.toString('hex') + path.extname(file.originalname));
        })
    }
})

const upload = multer({ storage: storage });
const PhotoService = require('@app/services/photos');
const route = Router();

module.exports = async function (routes) {
    routes.use('/photos', route);

    route.get('/', async(req, res, next) => {
        try {
            let idRichiesta = req.query.photo_review_id;
            let result = await PhotoService.getByReviewId(idRichiesta);
            res.status(200).json(result);
            UserService.increaseInteractions(req.query.logged_user_id);
        } catch (e) {
            let error = new HTTPError(e.code || 500, 'Error while getting photo: ' + e.message);
            next(error);
        }
    });


    route.post('/', upload.single('review_image'), async (req, res, next) => {
        try {
            if(!req.file){
                throw Error('Please provide an image');
            }
            const photo_path = req.file.path;
            let result = await PhotoService.add(req.query.photo_review_id, photo_path);
            res.status(201).json(result);
            // inc
        } catch (e) {
            let error = new HTTPError(e.code || 500, 'Error while inserting Photo: ' + e.message);
            next(error);
        }
    });
};
