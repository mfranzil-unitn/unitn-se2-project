const Review = require('@app/models/reviews');

async function write(review) {
    if (!review) {
        throw Error('Review parameter required.');
    }

    if (!review.review_user_id || !reviewreview_.line_id || !review.review_rating || !review.review_description) {
        throw Error('Please supply a valid Review object: { review_user_id : String, '
            + 'review_line_id : Number, review_rating : Number, review_description: String }');
    }

    Review.insert(review);
    return;
}

async function read(filters) {
    // Change filters
    return Review.getByPrimaryKey(filters.review_id);
}

module.exports = {
    write,
    read
};
