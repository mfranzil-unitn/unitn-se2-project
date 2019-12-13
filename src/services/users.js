const User = require('@app/models/users');
const crypto = require('crypto');

const { HTTPError } = require('@app/errors');

const saltLength = 16;

function getNextSalt() {
    return crypto.randomBytes(Math.ceil(saltLength / 2)).toString('hex').slice(0, saltLength);
};

function hash(password, salt) {
    let hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    let value = hash.digest('hex');
    return value;
};

async function authenticate(user) {
    if (!user) {
        throw new HTTPError('User parameter required.', 400);
    }

    if (!user.user_id || !user.user_password) {
        throw new HTTPError('Please supply a valid User object: { user_id : String, user_password: String }', 400);
    }

    let query = await User.getByPrimaryKey(user.user_id);
    if (typeof query !== "undefined") {
        let possibleHash = hash(user.user_password, query.user_salt);
        if (possibleHash === query.user_hash) {
            return {};
        }
    }
    throw new HTTPError('Wrong username or password.', 422);
}

async function create(user) {
    if (!user) {
        throw new HTTPError('User parameter required.', 400);
    }

    if (!user.user_id || !user.user_name || !user.user_password) {
        throw new HTTPError('Please supply a valid User object: { user_id : String, user_password: String, '
            + 'user_name: String }', 400);
    }

    user.user_rank = 0;
    user.user_salt = getNextSalt();
    user.user_hash = hash(user.user_password, user.user_salt);

    let res = await User.insert(user);

    if (res != 1) {
        throw new HTTPError("Failed to create User, may already be present.", 409);
    }

    return true;
}

async function find(query) {
    if (!query.user_id && !query.limit && !query.offset) {
        throw new HTTPError('Please supply a comma-separated parameter of IDS in user_id, or limit and offset.', 400);
    } else if (!!query.limit && !!query.offset) {
        let users = await User.getAll(query.limit, query.offset);

        for (element of users) {
            delete element['user_hash'];
            delete element['user_salt'];
        }
        let count_res = await User.getCount();

        let detailed_res = {
            "results": users,
            "metadata": {
                "total": count_res[0].count
            }
        }
        return detailed_res;
    } else if (query.length >= 0 && query.constructor === Array) {
        let users = [];
        for (element of query) {
            let user = await User.getByPrimaryKey(element);
            if (typeof user !== "undefined") {
                delete user['user_hash'];
                delete user['user_salt'];
                users.push(user);
            } else {
                users.push(undefined);
            }
        }
        return users;
    } else {
        let user = await User.getByPrimaryKey(query);
        if (typeof user !== "undefined") {
            delete user['user_hash'];
            delete user['user_salt'];
        } else {
            throw new HTTPError('Cannot find User.', 404);
        }
        return user;
    }
}

module.exports = {
    create,
    find,
    authenticate
};
