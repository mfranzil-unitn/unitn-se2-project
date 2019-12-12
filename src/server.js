const config = require('@app/config');
const Logger = require('@app/loaders/logger');

async function runServer() {
    const app = await require('@app/app')();

    app.listen(config.port, error => {
        if (error) {
            Logger.error(error);
            process.exit(1);
            return;
        }
        Logger.info(`
--------------------------------------------
  Server listening on port: ${config.port}  
--------------------------------------------
    `);
    });
}

runServer();
