const { Router } = require('express');

const multer = require('multer');
const crypto = require('crypto');
const path = require('path');

const UserService = require('@app/services/users');
const HTTPError = require('@app/utils').HTTPError;

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function (req, file, cb) {
        crypto.pseudoRandomBytes(16, function (err, raw) {
            if (err) return cb(err)

            cb(null, raw.toString('hex') + path.extname(file.originalname))
        })
    }
})

const upload = multer({ storage: storage });

const ReviewService = require('@app/services/reviews');
const route = Router();

module.exports = async function (routes) {
    routes.use('/reviews', route);

    route.get('/*', async (req, res, next) => {
        try {
            let result;
            if (req.path === '/') {
                result = await ReviewService.getAll(req.query);
                res.status(200).json(result);
                await UserService.increaseInteractions(req.query.logged_user_id);
            } else {
                result = await ReviewService.read(req.path.replace('/', ''));
                if (!result) {
                    throw Error('Invalid id');
                }
                res.status(200).json(result);
                await UserService.increaseInteractions(req.query.logged_user_id);
            }
        } catch (e) {
            let error = new HTTPError(e.code || 500, 'Error while returning the review: ' + e.message);
            next(error);
        }
    });

    route.post('/', upload.single('review_image'), async (req, res, next) => {
        try {
            let result;
            if (req.file) {
                const photo_path = req.file.path;
                result = await ReviewService.write(req.query, photo_path);
                res.status(201).json();
                await UserService.increaseInteractions(req.query.logged_user_id);
            }
            else {
                result = await ReviewService.write(req.query, null);
                res.status(201).json(result);
                await UserService.increaseInteractions(req.query.logged_user_id);
            }
        } catch (e) {
            let error = new Error(e.code || 500, 'Error while inserting Review: ' + e.message);
            next(error);
        }
    });
};

