let reviews = [];

async function write(review) {
  //Aggiunta della review
  reviews.push(review);
  const i = reviews.length;
  console.log('Added review n°' + i );
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
