const Review = require('@app/models/review');

async function write(review) {
  if (!review) {
    throw Error('review parameter required.');
  }

  if (!review.title || !review.text || !review.lineid) {
    throw Error('Please enter a title, some text and a line-id.');
  }

  return Review.create(review);
}

async function read(filters) {
  return Review.find(filters);
}

module.exports = {
  write,
  read
};
