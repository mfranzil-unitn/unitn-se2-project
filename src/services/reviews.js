const Review = require('@app/models/review');

class MissingReviewError extends Error {
  constructor(...args) {
    super(...args)
    Error.captureStackTrace(this, MissingReviewError)
  }
}


async function write(review) {
    if (!review || review === undefined) {
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
  let res;
    if(parseInt(rev_id) !== NaN && rev_id >=0){
       res =  await Review.getByPrimaryKey(rev_id);
    }
    if(res === undefined){
      throw new MissingReviewError('Review with this review_id not found');
    }
    return res;
}

async function getAll() {
  const res =  await Review.getAll();
  return res;
}


module.exports = {
    MissingReviewError,
    write,
    read,
    getAll
};
