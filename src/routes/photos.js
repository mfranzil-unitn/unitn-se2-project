const { Router } = require('express');

const multer = require('multer');
const upload = multer({dest: 'uploads/'});

const PhotoService = require('@app/services/photos');
const route = Router();

module.exports = async function (routes) {
  routes.use('/photo', route);

  route.post('/', upload.single('review_image'), async (req, res, next) => {
    try {
      const photo_path = req.file.path;
      let result = await PhotoService.add(req.query.photo_review_id, photo_path);
      res.status(201).json('Added image with id: ' + result + ' for review_id: ' + req.query.photo_review_id);
    } catch (e) {
      let error = new Error('Error while inserting Photo: ' + e.message);
      error.status = 400;
      next(error);
    }
  });
};
