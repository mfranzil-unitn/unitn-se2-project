const db = require('@app/models');
const Logger = require('@app/loaders/logger');

const queries = {
    insert: "INSERT INTO message (message_datetime, message_text, message_chat_id, message_user_id)"
        + "VALUES ($1, $2, $3, $4) RETURNING message_id;",
    update: "UPDATE message SET (message_datetime, message_text, message_chat_id, message_user_id)"
        + " = ($2, $3, $4, $5) WHERE message_id = $1;",
    delete: "DELETE FROM message WHERE message_id = $1;",
    getByPrimaryKey: "SELECT * FROM message WHERE message_id = $1;",
    getAll: "SELECT * FROM message;",
    getCount: "SELECT COUNT(*) FROM message;"
};

// message = { message_id : Number, message_datetime : Date, message_text : String,
//             message_chat_id : Number, message_user_id: String }
// message_chat_id is a foreign key to Chat
// message_user_id is a foreign key to User

module.exports = {
    insert: async ({ message_datetime, message_text, message_chat_id, message_user_id }) => {
        try {
            let res = await db.executeQuery(queries.insert, message_datetime, message_text,
                parseInt(message_chat_id), message_user_id);
            return res.rows[0].message_id;
        } catch (error) {
            Logger.error(error.stack);
            return -1;
        }
    },
    update: async ({ message_id, message_datetime, message_text, message_chat_id, message_user_id }) => {
        try {
            let res = await db.executeQuery(queries.update, parseInt(message_id), message_datetime, message_text,
                parseInt(message_chat_id), message_user_id);
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