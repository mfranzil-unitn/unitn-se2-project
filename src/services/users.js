const User = require('@app/models/users');
const crypto = require('crypto');

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
        throw Error('User parameter required.');
    }

    if (!user.user_id || !user.user_password) {
        throw Error('Please supply a valid User object: { user_id : String, user_password: String }');
    }

    let query = await User.getByPrimaryKey(user.user_id);
    if (typeof query !== "undefined") {
        let possibleHash = hash(user.user_password, query.user_salt);
        if (possibleHash === query.user_hash) {
            return {};
        }
    }
    throw Error('Wrong username or password.');
}

async function create(user) {
    if (!user) {
        throw Error('User parameter required.');
    }

    if (!user.user_id || !user.user_name || !user.user_password) {
        throw Error('Please supply a valid User object: { user_id : String, user_password: String, '
            + 'user_name: String }');
    }

    user.user_rank = 0;
    user.user_salt = getNextSalt();
    user.user_hash = hash(user.user_password, user.user_salt);

    return await User.insert(user);
}

async function find(query) {
    if (!query) {
        throw Error('Please supply an array of IDS, or an Object containing limit and offset.')
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
            //TODO more precise error
            throw Error('Cannot find User.');
        }
        return user;
    }
}

module.exports = {
    create,
    find,
    authenticate
};
