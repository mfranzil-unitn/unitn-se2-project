let reviews = [];

async function create(review) {
  //Aggiunta della review
  reviews.push(review);
  const i = reviews.length;
  console.log('Added review n°' + i);
}

// eslint-disable-next-line no-unused-vars
async function read(filters) {
  console.log(filters);
  return reviews;
}

module.exports = {
  create,
  read
};
