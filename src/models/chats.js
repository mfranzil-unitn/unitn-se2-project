const db = require('@app/models');

const Logger = require('@app/loaders/logger');

const queries = {
    insert: "INSERT INTO chat (chat_name) VALUES ($1) RETURNING chat_id;",
    update: "UPDATE chat SET (chat_name) = ($2) WHERE chat_id = $1;",
    delete: "DELETE FROM chat WHERE chat_id = $1;",
    getByPrimaryKey: "SELECT * FROM chat WHERE chat_id = $1;",
    getAll: "SELECT * FROM chat;",
    getCount: "SELECT COUNT(*) FROM chat;"
};

// chat = { chat_id: Integer, chat_name: String };

module.exports = {
    insert: async ({ chat_name }) => {
        try {
            let res = await db.executeQuery(queries.insert, chat_name);
            return res.rows[0].chat_id;
        } catch (error) {
            Logger.error(error.stack);
            return -1;
        }
    },
    update: async ({ chat_id, chat_name }) => {
        try {
            let res = await db.executeQuery(queries.update, parseInt(chat_id), chat_name);
            return res.rowCount;
        } catch (error) {
            Logger.error(error.stack);
            return -1;
        }
    },
    delete: async (primaryKey) => {
        try {
            let res = await db.executeQuery(queries.delete, parseInt(primaryKey));
            return res.rowCount;
        } catch (error) {
            Logger.error(error.stack);
            return -1;
        }
    },
    getByPrimaryKey: async (primaryKey) => {
        try {
            let res = await db.executeQuery(queries.getByPrimaryKey, parseInt(primaryKey));
            return res.rows.length === 1 ? res.rows[0] : undefined;
        } catch (error) {
            Logger.error(error.stack);
            return undefined;
        }
    },
    getAll: async () => {
        try {
            let res = await db.executeQuery(queries.getAll);
            return res.rows;
        } catch (error) {
            Logger.error(error.stack);
            return undefined;
        }
    },
    getCount: async () => {
        try {
            let res = await db.executeQuery(queries.getCount);
            return res.rows;
        } catch (error) {
            Logger.error(error.stack);
            return undefined;
        }
    }
}