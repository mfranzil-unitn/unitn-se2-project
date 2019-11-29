const db = require('.');

const queries = {
    insert: "INSERT INTO chat_member (chat_member_chat_id, chat_member_user_id) VALUES ($1, $2)",
    update: "UPDATE chat_member SET (chat_member_chat_id, chat_member_user_id) = ($1, $2)" +
        " WHERE chat_member_chat_id = $1 AND chat_member_user_id = $2;",
    delete: "DELETE FROM chat_member WHERE chat_member_chat_id = $1 AND chat_member_user_id = $2;",
    getByPrimaryKey: "SELECT * FROM chat_member WHERE chat_member_chat_id = $1 AND chat_member_user_id = $2",
    getAll: "SELECT * FROM chat_member;",
    getCount: "SELECT COUNT(*) FROM chat_member;"
};

// chat_member = { chat_member_chat_id : Number, chat_member_user_id : String };
// chat_member_chat_id is a foreign key to Chat
// chat_member_user_id is a foreign key to User

module.exports = {
    insert: async ({ chat_member_chat_id, chat_member_user_id }) => {
        try {
            let res = await db.executeQuery(queries.insert, chat_member_chat_id, chat_member_user_id);
            return res.rowCount;
        } catch(error) {
            console.log(error.stack);
            return -1;
        }
    },
    update: async ({ chat_member_chat_id, chat_member_user_id }) => {
        try {
            let res = await db.executeQuery(queries.update, chat_member_chat_id, chat_member_user_id);
            return res.rowCount;
        } catch(error) {
            console.log(error.stack);
            return -1;
        }
    },
    delete: async (primaryKey) => {
        try {
            let res = await db.executeQuery(queries.delete, primaryKey.chat_member_chat_id, 
                primaryKey.chat_member_user_id);
            return res.rowCount;
        } catch(error) {
            console.log(error.stack);
            return -1;
        }
    },
    getByPrimaryKey: async (primaryKey) => {
        try {
            let res = await db.executeQuery(queries.getByPrimaryKey, 
                primaryKey.chat_member_chat_id, primaryKey.chat_member_user_id);
            return res.rows.length === 1 ? res.rows[0] : undefined;
        } catch(error) {
            console.log(error.stack);
            return undefined;
        }
    },
    getAll: async () => {
        try {
            let res = await db.executeQuery(queries.getAll);
            return res.rows;
        } catch(error) {
            console.log(error.stack);
            return undefined;
        }
    },
    getCount: async () => {
        try {
            let res = await db.executeQuery(queries.getCount);
            return res.rows;
        } catch(error) {
            console.log(error.stack);
            return undefined;
        }
    }
}