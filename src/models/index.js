const { Pool } = require('pg');
const config = require('@app/config');
const Logger = require('@app/loaders/logger');

const pool = new Pool(config.db);

let queryCounter = 0;

module.exports = {
    executeQuery: async (text, ...params) => {
        let client = await pool.connect();
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
            Logger.error("Query executed", { query: query, duration: duration });
        } catch (error) {
            await client.query('ROLLBACK');
            client.release();
            Logger.error("Failed to execute query", { query: query, error: error.stack });
        }

        return res;
    }
}