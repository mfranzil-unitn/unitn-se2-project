let reviews = [];

async function write(review) {
  //Aggiunta della review
  reviews.push(review);
  console.log('Added review');
}

// eslint-disable-next-line no-unused-vars
async function read(review) {
  //
  return reviews;
}

module.exports = {
  write,
  read
};
