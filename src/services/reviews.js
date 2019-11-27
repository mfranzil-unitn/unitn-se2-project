const Review = require('@app/models/review');

async function write(review) {
  if (!review) {
    throw Error('review parameter required.');
  }

  if (!review.id || !review.user_id || !review.line_id || !review.rating || !review.description_text) {
    throw Error('Please enter an id, your user_id, a line_id, a rating and  some text');
  }

  Review.write(review);
  return;
}

async function read(filters) {
  return Review.find(filters);
}

module.exports = {
  write,
  read
};
