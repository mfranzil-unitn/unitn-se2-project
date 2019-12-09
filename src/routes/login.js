require('dotenv')

const { Router } = require('express');
const jwt = require('jsonwebtoken')

const UserService = require('@app/services/users');

const route = Router();

module.exports = async function (routes) {
    routes.use('/login', route);

    route.post('/', async (req, res, next) => {
        try {
            await UserService.authenticate(req.query);
            
            // Create a temporary token for auth 
            // if auth with db was successful
            let username = req.query.user_id;
            if (username) {
                const token = jwt.sign({ username }, process.env.ACCESS_TOKEN_SECRET, {
                    algorithm: 'HS256'
                    //expiresIn: process.env.EXPIRATION_TOKEN
                })
                res.cookie('token', token, { maxAge: process.env.EXPIRATION_TOKEN * 1000 });
            }
            res.status(200).json();
        } catch (e) {
            const error = new Error('Failed to login: ' + e.message);
            error.httpStatusCode = 400;
            next(error);
        }

    });
};
