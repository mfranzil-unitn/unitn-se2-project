const Review = require('@app/models/review');

const UserService = require("@app/services/users");

async function write(review) {
    if (!review) {
        throw Error('Review parameter required.');
    }

    if (!review.review_user_id || !review.review_line_id || !review.review_rating || !review.review_description) {
        throw Error('Please supply a valid Review object: { review_user_id : String, '
            + 'review_line_id : Number, review_rating : Number, review_description: String }');
    }

    let res = await Review.insert(review);
    console.log('Added new review');
    return res;
}

async function read(filters) {
    // Change filters
    const res =  await Review.getByPrimaryKey(filters.review_id);
    return res;
}

module.exports = {
    write,
    read
};
