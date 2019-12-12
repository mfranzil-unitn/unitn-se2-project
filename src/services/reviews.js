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

    let res,res1,res2;
    if (parseInt(rev_id) !== NaN && rev_id >= 0) {
        res1 = await Review.getByPrimaryKey(rev_id);
        res2 = await Photo.getByReviewId(rev_id);
        res = new Object();
        res.review_id = res1.review_id;
        res.review_user_id = res1.review_user_id;
        res.review_line_id = res1.review_line_id;
        res.review_rating = res1.review_rating;
        res.review_description = res1.review_description;
        res.review_photo_path = res2.photo_path;
        res = JSON.stringify(res);
        res = JSON.parse(res);
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
