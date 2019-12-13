const path = require('path');
const dotenv = require('dotenv');

if (!process.env.TRAVIS && !process.env.HEROKU) {
    // Set the NODE_ENV to 'development' by default
    process.env.NODE_ENV = process.env.NODE_ENV || 'development';

    const envFile = process.env.NODE_ENV === 'test' ? '.env.test' : '.env';

    const result = dotenv.config({ path: path.resolve(process.cwd(), envFile) });

    if (result.error) {
        // This error should crash whole process
        throw result.error;
    }
}

module.exports = {
    port: process.env.PORT || 3000,

    /**
     * API configs
     */
    api: {
        prefix: ('/api/v' + process.env.VERSION) || '/api'
    },

    /**
     * Used by winston logger
     */
    logs: {
        level: process.env.LOG_LEVEL || 'silly'
    },

    /**
     * Used by the DB
     */
    db: {
        user: process.env.PGUSER || process.env.USER,
        host: process.env.PGHOST || 'localhost',
        database: process.env.PGDATABASE || process.env.USER,
        password: process.env.PGPASSWORD || process.env.USER,
        port: process.env.PGPORT || 5432,
    }
};

