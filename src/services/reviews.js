const Review = require('@app/models/reviews');
const Photo = require('@app/models/photos');

class MissingReviewError extends Error {
    constructor(...args) {
        super(...args)
        Error.captureStackTrace(this, MissingReviewError)
    }
}

async function write(review, path) {
    if (!review) {
        throw Error('Review parameter required.');
    }

    if (!review.review_user_id || !review.review_line_id || !review.review_rating || !review.review_description) {
        throw Error('Please supply a valid Review object: { review_user_id : String, '
            + 'review_line_id : Number, review_rating : Number, review_description: String }');
    }

    let res = await Review.insert(review);

    console.log('Added new review');
    if (path) {
        let pic = {};
        pic.photo_review_id = res;
        pic.photo_path = path;
        let insert_id = await Photo.insert(pic);
        console.log('Added photo for review: ' + res + ' with id: ' + insert_id);
    }
    return res;
}

async function read(rev_id) {
    if (!rev_id) {
        throw Error('Review parameter required.');
    }

    let res;
    if (parseInt(rev_id) !== NaN && rev_id >= 0) {
        res = await Review.getByPrimaryKey(rev_id);
    } else if (typeof res === "undefined") {
        throw new MissingReviewError('Review with this review_id not found.');
    }
    return res;
}

async function getAll() {
    const res = await Review.getAll();
    return res;
}


module.exports = {
    MissingReviewError,
    write,
    read,
    getAll
};
