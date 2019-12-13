const { Router } = require('express');

const ChatService = require('@app/services/chats');

const route = Router();

module.exports = async function (routes) {
    routes.use('/chats', route);

    route

    route.patch('/*', async (req, res, next) => {
        try {
            if (req.path === '/') {
                res.status(404).json({
                    message: "Please perform a PATCH request to a valid chat_id."
                });
            } else {
                req.query.chat_id = req.path.replace('/', '')
                let result = await ChatService.join(req.query);
                res.status(200).json(result);
            }
        } catch (e) {
            const error = new Error('Failed to retrieve messages for the chat: ' + e.message);
            error.status = 400;
            next(error);
        }
    });

    route.delete('/*', async (req, res, next) => {
        try {
            if (req.path === '/') {
                res.status(404).json({
                    message: "Please perform a DELETE request to a valid chat_id."
                }); 
            } else {
                req.query.chat_id = req.path.replace('/', '')
                result = await ChatService.leave(req.query);
                res.status(204).json();
            }
        } catch (e) {
            const error = new Error('Failed to retrieve messages for the chat: ' + e.message);
            error.status = 400;
            next(error);
        }
    });

    route.post('/*', async (req, res, next) => {
        if (req.path === '/') {
            try {
                let result = await ChatService.create(req.query);
                res.status(201).json(result);
            } catch (e) {
                const error = new Error('Failed to create chat: ' + e.message);
                error.status = 400;
                next(error);
            }
        } else {
            try {                
                req.query.chat_id = req.path.replace('/', '')
                let result = await ChatService.sendMessage(req.query);
                res.status(201).json(result);
            } catch (e) {
                const error = new Error('Failed to send message: ' + e.message);
                error.status = 400;
                next(error);
            }
        }
    });

    route.get('/*', async (req, res, next) => {
        try {
            if (req.path === '/') {
                res.status(404).json({
                    message: "Please perform a GET request to a valid chat_id."
                });
            } else {
                // gets all messages from a chat
                req.query.chat_id = req.path.replace('/', '')
                let result = await ChatService.getMessages(req.query);
                res.status(200).json(result);
            }
        } catch (e) {
            const error = new Error('Failed to retrieve messages for the chat: ' + e.message);
            error.status = 400;
            next(error);
        }
    });
}