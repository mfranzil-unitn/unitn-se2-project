const { Pool } = require('pg');
const config = require('@app/config');
const Logger = require('@app/loaders/logger');

const pool = new Pool(config.db);

let queryCounter = 0;

module.exports = {
    executeQuery: async (text, ...params) => {
        if (typeof pool === 'undefined') {
            return undefined;
        }

        let client = undefined;
        try {
            client = await pool.connect();
        } catch (error) {
            Logger.error("Failed to initialized connection.");
            return undefined;
        }

        const start = Date.now();

        let query = {
            name: "Q" + queryCounter++,
            text: text,
            values: params
        }

        await client.query('BEGIN');

        let res = undefined;

        try {
            res = await client.query(query);
            const duration = Date.now() - start;
            await client.query('COMMIT');
            Logger.info("Query executed: %o", { query: query, duration: duration });
        } catch (error) {
            await client.query('ROLLBACK');
            client.release();
            Logger.error("Failed to execute query: %o", { query: query, error: error.stack });
        }

        await client.end();
        return res;
    },
    close: async () => {
        if (typeof pool !== 'undefined') {
            try {
                pool.end();
                return true;
            } catch (error) {
                Logger.error("Failed to properly close connection pool: %o", { error: error.stack });
                return false;
            }
        }
    }
}