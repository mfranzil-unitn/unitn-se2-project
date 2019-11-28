let reviews = [];

async function create(review) {
  //Aggiunta della review
  reviews.push(review);
  const i = reviews.length;
  console.log('Added review n°' + i);
}

// eslint-disable-next-line no-unused-vars
async function read(filters) {
  function filterit(value) {
    return  (value.rev_id == filters.rev_id &&
      value.user_id == filters.user_id &&
      value.line_id == filters.line_id &&
      value.rating == filters.rating &&
      value.description_text == filters.description_text);
  }
  return reviews.filter(filterit);
}

module.exports = {
  create,
  read
};
