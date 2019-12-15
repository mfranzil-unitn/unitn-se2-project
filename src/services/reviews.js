const Review = require('@app/models/reviews');
const Photo = require('@app/models/photos');

const { HTTPError } = require('@app/errors');

function isInteger(value) {
    return value.match(/^[0-9]+$/) != null;
}

async function write(review, path) {
    if (!review) {
        throw new HTTPError('Review parameter required.', 400);
    }

    if (!review.review_user_id || !review.review_line_id || !review.review_rating || !review.review_description) {
        throw new HTTPError('Please supply a valid Review object: { review_user_id : String, '
            + 'review_line_id : Number, review_rating : Number, review_description: String }', 400);
    }

    let res = await Review.insert(review);

    if (path) {
        let pic = {};
        pic.photo_review_id = res;
        pic.photo_path = path;
        let insert_id = await Photo.insert(pic);
        console.log('Added photo for review: ' + res + ' with id: ' + insert_id);
        return {
            review_id: res,
            photo_path: path
        }
    } else {
        return {
            review_id: res
        };
    }
}

async function read(rev_id) {
    if (!rev_id) {
        throw new HTTPError('Review parameter required.', 400);
    }

    let res, path;
    if (!Number.isNaN(rev_id) && rev_id >= 0) {
        res = await Review.getByPrimaryKey(rev_id);
        path = await Photo.getPathByReviewId(rev_id);
        if (!!path) {
            res.review_photo_path = path;
        } else {
            res.review_photo_path = 'No photo provided';
        }
    } else if (typeof res === "undefined") {
        throw new HTTPError('Review with this review_id not found.', 404);
    } else {
        throw new HTTPError('Invalid number of parameters', 400);
    }
    return res;
}

async function getAll(query) {
    if (!query || !query.limit || !query.offset || !isInteger(query.limit) || !isInteger(query.offset)) {
        throw new HTTPError("Please specify limit and offset first as integers", 400);
    }
    let res = await Review.getAll(query.limit, query.offset);
    let count_res = await Review.getCount();

    let detailed_res = {
        "results": res,
        "metadata": {
            "total": count_res[0].count
        }
    }
    return detailed_res;
}


module.exports = {
    write,
    read,
    getAll
};

