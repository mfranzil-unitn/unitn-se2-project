const db = require('.');

const queries = {
    insert: "INSERT INTO user_ (user_id, user_hash, user_salt, user_rank, user_name)"
        + " VALUES ($1, $2, $3, $4, $5)",
    update: "UPDATE user_ SET (user_hash, user_salt, user_rank, user_name)"
        + " = ($2, $3, $4, $5) WHERE user_id = $1;",
    delete: "DELETE FROM user_ WHERE user_id = $1;",
    getByPrimaryKey: "SELECT * FROM user_ WHERE user_id = $1",
    getAll: "SELECT * FROM user_;",
    getCount: "SELECT COUNT(*) FROM user_;"
};

// user = { user_id : String, user_hash: String, user_salt: String, user_rank: String, user_name: String }

module.exports = {
    insert: async ({ user_id, user_hash, user_salt, user_rank, user_name }) => {
        try {
            let res = await db.executeQuery(queries.insert, user_id, user_hash, user_salt, user_rank, user_name);
            return res.rowCount;
        } catch (error) {
            return -1;
        }
    },
    update: async ({ user_id, user_hash, user_salt, user_rank, user_name }) => {
        try {
            let res = await db.executeQuery(queries.update, user_id, user_hash, user_salt, user_rank, user_name);
            return res.rowCount;
        } catch (error) {
            return -1;
        }
    },
    delete: async (primaryKey) => {
        try {
            let res = await db.executeQuery(queries.delete, primaryKey);
            return res.rowCount;
        } catch (error) {
            return -1;
        }
    },
    getByPrimaryKey: async (primaryKey) => {
        try {
            let res = await db.executeQuery(queries.getByPrimaryKey, primaryKey);
            return res.rows === 1 ? res.rows[0] : undefined;
        } catch (error) {
            return undefined;
        }
    },
    getAll: async () => {
        try {
            let res = await db.executeQuery(queries.getAll);
            return res.rows;
        } catch (error) {
            return undefined;
        }
    },
    getCount: async () => {
        try {
            let res = await db.executeQuery(queries.getCount);
            return res.rows;
        } catch (error) {
            return undefined;
        }
    }
}