const User = require('@app/models/user');
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

async function create(user) {
    if (!user) {
        throw Error('Please supply a valid User object.');
    }

    if (!user.user_id || !user.user_name || !user.user_password) {
        throw Error('Please supply a valid User object: { user_id : String, user_hash: String, '
            + 'user_salt: String, user_rank: String, user_name: String }');
    }

    user.user_rank = 0;
    user.user_salt = getNextSalt();
    user.user_hash = hash(user.user_password, user.user_salt);

    return User.insert(user);
}

async function find(filters) {
    return User.getAll();
    //return User.find(filters);
}

module.exports = {
    create,
    find
};
