const db = require('@app/models');

const queries = {
    insert: "INSERT INTO line (line_user_id, line_start_lat,"
        + " line_start_lon, line_end_lat, line_end_lon, line_name, line_description)"
        + " VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING line_id;",
    update: "UPDATE line SET (line_user_id, line_start_lat,"
        + " line_start_lon, line_end_lat, line_end_lon, line_name, line_description)"
        + " = ($2, $3, $4, $5, $6, $7, $8) WHERE line_id = $1;",
    delete: "DELETE FROM line WHERE line_id = $1;",
    getByPrimaryKey: "SELECT * FROM line WHERE line_id = $1;",
    getAll: "SELECT * FROM line;",
    getAllLimited: "SELECT * FROM line LIMIT $1 OFFSET $2;",
    getCount: "SELECT COUNT(*) FROM line;"
};

// line = { line_id: Integer, line_user_id: String,
//          line_start_lat: Number, line_start_lon: Number,
//          line_end_lat: Number, line_end_lon: Number, line_name: String};
// Lat and long are Numeric(9,6) (es. 123.456789)
// line_user_id is a foreign key to User

module.exports = {
    insert: async ({ line_user_id, line_start_lat, line_start_lon, line_end_lat, line_end_lon, line_name, line_description }) => {
        try {
            let res = await db.executeQuery(queries.insert, line_user_id, parseFloat(line_start_lat),
                parseFloat(line_start_lon), parseFloat(line_end_lat), parseFloat(line_end_lon), line_name, line_description);
            return res.rows[0].line_id;
        } catch (error) {
            throw new Error('UserID not found');
            console.log(error.stack);
            return -1;
        }
    },
    update: async ({ line_id, line_user_id, line_start_lat, line_start_lon, line_end_lat, line_end_lon, line_name, line_description }) => {
        try {
            let res = await db.executeQuery(queries.update, parseInt(line_id), line_user_id, parseFloat(line_start_lat),
                parseFloat(line_start_lon), parseFloat(line_end_lat), parseFloat(line_end_lon), line_name, line_description);
            return res.rowCount;
        } catch (error) {
            console.log(error.stack);
            return -1;
        }
    },
    delete: async (primaryKey) => {
        try {
            let res = await db.executeQuery(queries.delete, parseInt(primaryKey));
            return res.rowCount;
        } catch (error) {
            console.log(error.stack);
            return -1;
        }
    },
    getByPrimaryKey: async (primaryKey) => {
        try {
            let res = await db.executeQuery(queries.getByPrimaryKey, parseInt(primaryKey));
            return res.rows.length === 1 ? res.rows[0] : undefined;
        } catch (error) {
            console.log(error.stack);
            return undefined;
        }
    },
    getAll: async (limit, offset) => {
        try {
            let res = undefined;
            if (!!limit && !!offset) {
                res = await db.executeQuery(queries.getAllLimited, limit, offset);
            } else {
                res = await db.executeQuery(queries.getAll);
            }
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
            console.log(error.stack);
            return undefined;
        }
    }
}

