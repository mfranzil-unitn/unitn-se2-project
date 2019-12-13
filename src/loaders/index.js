const Logger = require('@app/loaders/logger');
const expressLoader = require('@app/loaders/express');

module.exports = async function (app) {
    await expressLoader(app);
    Logger.info('Express loaded');
};

