const Review = require('@app/models/review');

async function write(review) {
    if (!review) {
        throw Error('Review parameter required.');
    }

    if (!review.review_user_id || !review.review_line_id || !review.review_rating || !review.review_description) {
        throw Error('Please supply a valid Review object: { review_user_id : String, '
            + 'review_line_id : Number, review_rating : Number, review_description: String }');
    }

    let ret = await Review.insert(review);
    console.log('Added new review');
    return ret;
}

async function read(rev_id) {
    const res =  await Review.getByPrimaryKey(rev_id);
    return res;
}

module.exports = {
    write,
    read
};
