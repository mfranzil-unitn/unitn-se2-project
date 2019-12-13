const Photo = require('@app/models/photos');

async function add(review_id, path) {
    if (!review_id || typeof review_id === "undefined") {
        throw Error('Review_id parameter required.');
    }

    if (!path) {
        throw Error('Please supply a valid Photo object: { photo_review_id : Number, photo_path: String }');
    }

    let pic = {};
    pic.photo_review_id = review_id;
    pic.photo_path = path;
    let insert_id = await Photo.insert(pic);
    if (insert_id === -1) {
        throw Error('Invalid review_id');
    }

    return insert_id;
}

async function get(primaryKey) {
    if (!primaryKey || typeof(primaryKey) === "undefined") {
        throw Error('No PK');
    }
    let path = await Photo.getByPrimaryKey(primaryKey).photo_path;
    if (typeof(path) === "undefined") {
        throw new Error('No image found');
    }
    return path;
}

async function getByReviewId(reviewId) {
    if (!reviewId || typeof(reviewId) === "undefined") {
        throw Error('No PK');
    }
    let path = await Photo.getPathByReviewId(reviewId);
    if (typeof(path) === "undefined") {
        console.log(path);
        throw new Error('No image found for this reviewId');
    }
    return path;
}

module.exports = {
    add,
    get,
    getByReviewId
};
