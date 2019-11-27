const { Router } = require('express');

const ReviewService = require('@app/services/reviews');

const route = Router();

module.exports = async function(routes) {
  routes.use('/review', route);

  route.get('/', async(req,res,next)=>{
    try{
      await ReviewService.read(req.query);
      res.status(200).json();
    } catch(e){
      const error = new Error('Error while returning the review: ' + e.message);
      error.httpStatusCode = 400;
      next(error);
    }
  })

  route.post('/', async (req, res, next) => {
    try {
      await ReviewService.write(req.query);
      res.status(200).json();
    } catch (e) {
      const error = new Error('Wrong review info: ' + e.message);
      error.httpStatusCode = 400;
      next(error);
    }

  });
};
