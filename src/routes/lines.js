const { Router } = require('express');

const PlaceLineService = require('@app/services/lines');

const route = Router();

module.exports = async function(routes) {
  routes.use('/line', route);

  route.post('/', async (req, res, next) => {

    try {
        await PlaceLineService.place(req.query);
        res.status(200).end();
    } catch (e) {
        const error = new Error('Wrong line info: ' + e.message);
        error.httpStatusCode = 400;
        next(error);
    }

  });

  route.get('/*', async (req, res, next) => {
    console.log(req.path);
    let result;

    if(req.path === "/"){
      result = await PlaceLineService.getAll();
    }
    else{
      result = await PlaceLineService.get(req.path.replace('/', ''));
      console.log("Result:");
      console.log(result);
    }
    res.status(200).json(result);
  });
};
