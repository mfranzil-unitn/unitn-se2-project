const { Router } = require('express');

const multer = require('multer');
const crypto = require('crypto');
const path = require('path');

const UserService = require('@app/services/users');
const { HTTPError } = require('@app/errors');

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
            if (req.path === '/') {
                let result = await ReviewService.getAll(req.query);
                await UserService.increaseInteractions(req.query.logged_user_id);
                res.status(200).json(result);
            } else {
                let result = await ReviewService.read(req.path.replace('/', ''));
                await UserService.increaseInteractions(req.query.logged_user_id);
                res.status(200).json(result);
            }
        } catch (e) {
            const error = new Error('Error while returning the review: ' + e.message);
            error.status = e.code || 500;
            next(error);
        }
    });

    route.post('/', upload.single('review_image'), async (req, res, next) => {
        try {
            if (req.file) {
                const photo_path = req.file.path;
                let result = await ReviewService.write(req.query, photo_path);
                await UserService.increaseInteractions(req.query.logged_user_id);
                res.status(201).json(result);
            }
            else {
                let result = await ReviewService.write(req.query, null);
                await UserService.increaseInteractions(req.query.logged_user_id);
                res.status(201).json(result);
            }
        } catch (e) {
            const error = new Error('Error while inserting Review: ' + e.message);
            error.status = e.code || 500;
            next(error);
        }
    });
};

