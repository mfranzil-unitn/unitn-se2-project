const Photo = require('@app/models/photos');

const { HTTPError } = require('@app/errors');

async function add(review_id, path) {
    if (!review_id || typeof review_id === "undefined") {
        throw new HTTPError('Review_id parameter required.', 400);
    }

    if (!path) {
        throw new HTTPError('Please supply a valid Photo object: { photo_review_id : Number, photo_path: String }', 400);
    }

    let pic = {};
    pic.photo_review_id = review_id;
    pic.photo_path = path;
    let insert_id = await Photo.insert(pic);
    if (insert_id === -1) {
        throw new HTTPError('Invalid review_id', 400);
    }

    return {
        photo_id: insert_id
    };
}

async function get(primaryKey) {
    if (!primaryKey || typeof (primaryKey) === "undefined") {
        throw new HTTPError('No PK', 400);
    }
    let path = await Photo.getByPrimaryKey(primaryKey).photo_path;
    if (typeof (path) === "undefined") {
        throw new HTTPError('No image found', 404);
    }
    return path;
}

async function getByReviewId(reviewId) {
    if (!reviewId || typeof (reviewId) === "undefined") {
        throw new HTTPError('No PK', 400);
    }
    let path = await Photo.getPathByReviewId(reviewId);
    if (typeof (path) === "undefined") {
        console.log(path);
        throw new HTTPError('No image found for this reviewId', 404);
    }
    return path;
}

module.exports = {
    add,
    get,
    getByReviewId
};
