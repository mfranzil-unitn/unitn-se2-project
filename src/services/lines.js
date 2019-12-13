const Line = require('@app/models/lines');

const { HTTPError } = require('@app/errors');

function isFloat(value) {
    if (!isNaN(value) && value >= 0) {
        return true;
    } else {
        return false;
    }
}

function isInteger(value) {
    return value.match(/^[0-9]+$/) != null;
}

async function place(line) {
    if (!line) {
        throw new HTTPError('Line parameter required.', 400);
    }

    if (!line.line_user_id || !line.line_start_lat || !line.line_start_lon || !line.line_end_lat
        || !line.line_end_lon || !line.line_name || !line.line_description || !isFloat(line.line_start_lat)
        || !isFloat(line.line_start_lon) || !isFloat(line.line_end_lat) || !isFloat(line.line_end_lon)) {
        throw new HTTPError('Please supply a valid Line object: { line_user_id: String, '
            + 'line_start_lat: Number, line_start_lon: Number, line_end_lat: Number, '
            + 'line_end_lon: Number, line_name: String, line_description: String}', 400);
    }

    if (query.line_user_id !== query.logged_user_id) {
        throw new HTTPError("Please supply the user_id as you logged in with.", 401);
    }

    let newLineID = await Line.insert(line);

    return {
        line_id: newLineID
    };
}

async function getAll(query) {
    if (!query || !query.limit || !query.offset || !isInteger(query.limit) || !isInteger(query.offset)) {
        throw new HTTPError("Please specify limit and offset first as integers", 400);
    }
    let res = await Line.getAll(query.limit, query.offset);
    let count_res = await Line.getCount();

    return {
        results: res,
        metadata: {
            total: count_res[0].count
        }
    };
}

async function get(id) {
    if (parseInt(id) != NaN && id >= 0) {
        let res = await Line.getByPrimaryKey(id);
        if (typeof res === "undefined") {
            throw new HTTPError('Line with this LineID not found', 404);
        }
        return res;
    }
    else {
        throw new HTTPError('Please enter a valid LineID', 400);
    }
}

module.exports = {
    place,
    getAll,
    get
};
