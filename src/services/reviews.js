const Review = require('@app/models/reviews');

async function write(review) {
  if (!review) {
    throw Error('review parameter required.');
  }

  if (!review.rev_id || !review.user_id || !review.line_id || !review.rating || !review.description_text) {
    throw Error('Please enter an id, your user_id, a line_id, a rating and  some text');
  }

  Review.create(review);
  return;
}

async function read(filters) {
  let res = await Review.read(filters);
  return res;
}

module.exports = {
  write,
  read
};
