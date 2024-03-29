const { Router } = require('express');

const ChatService = require('@app/services/chats');
const UserService = require('@app/services/users');
const HTTPError = require('@app/utils').HTTPError;

const route = Router();

module.exports = async function (routes) {
    routes.use('/chats', route);

    route.patch('/*', async (req, res, next) => {
        try {
            if (req.path === '/') {
                const error = new HTTPError(404, "Please perform a PATCH request to a valid chat_id.");
                next(error);
            } else {
                req.query.chat_id = req.path.replace('/', '')
                let result = await ChatService.join(req.query);
                res.status(200).json(result);
                await UserService.increaseInteractions(req.query.logged_user_id);
            }
        } catch (e) {
            const error = new HTTPError(e.code || 500, 'Failed to retrieve messages for the chat: ' + e.message);
            next(error);
        }
    });

    route.delete('/*', async (req, res, next) => {
        try {
            if (req.path === '/') {
                const error = new HTTPError(404, "Please perform a DELETE request to a valid chat_id.");
                next(error);
            } else {
                req.query.chat_id = req.path.replace('/', '')
                result = await ChatService.leave(req.query);
                res.status(200).json(result);
            }
        } catch (e) {
            const error = new HTTPError(e.code || 500, 'Failed to retrieve messages for the chat: ' + e.message);
            next(error);
        }
    });

    route.post('/*', async (req, res, next) => {
        if (req.path === '/') {
            try {
                let result = await ChatService.create(req.query);
                res.status(201).json(result);
                await UserService.increaseInteractions(req.query.logged_user_id);
            } catch (e) {
                const error = new HTTPError(e.code || 500, 'Failed to create chat: ' + e.message);
                next(error);
            }
        } else {
            try {                
                req.query.chat_id = req.path.replace('/', '')
                let result = await ChatService.sendMessage(req.query);
                res.status(201).json(result);
                await UserService.increaseInteractions(req.query.logged_user_id);
            } catch (e) {
                const error = new HTTPError(e.code || 500, 'Failed to send message: ' + e.message);
                next(error);
            }
        }
    });

    route.get('/*', async (req, res, next) => {
        try {
            if (req.path === '/') {
                const error = new HTTPError(404, "Please perform a GET request to a valid chat_id.");
                next(error);
            } else {
                req.query.chat_id = req.path.replace('/', '')
                let result = await ChatService.getMessages(req.query);
                res.status(200).json(result);
            }
        } catch (e) {
            const error = new HTTPError(e.code || 500, 'Failed to retrieve messages for the chat: ' + e.message);
            next(error);
        }
    });
}

