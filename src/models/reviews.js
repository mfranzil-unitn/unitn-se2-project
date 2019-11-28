let reviews = [];
let id = 0;

class Review{
  constructor(rev_id, user_id, line_id, rating, description_text) {
    this.rev_id = id++;
    this.user_id = user_id;
    this.line_id = line_id;
    this.rating = rating;
    this.description_text = description_text;

}
}

async function create(review) {
  //Aggiunta della review
  reviews.push(new Review(review.rev_id, review.user_id, review.line_id,review.rating, review.description_text));
  const i = reviews.length;
  console.log('Added review n°' + i);
}

async function read(filters) {
  function filterit(value) {
    console.log(value.rev_id);
    return  (value.rev_id == filters.rev_id);
  }
  let filtered =  reviews.filter(filterit);
  return filtered;
}

module.exports = {
  create,
  read
};
