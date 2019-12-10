const Photo = require('@app/models/photo');

async function add(review_id, path) {
  if (!review_id || review_id === undefined) {
    throw Error('Review_id parameter required.');
  }

  if (!path) {
    throw Error('Please supply a valid Photo object: { photo_review_id : Number, photo_path: String }');
  }

  let pic = {};
  pic.photo_review_id = review_id;
  pic.photo_path = path;
  let insert_id = await Photo.insert(pic);
  if(insert_id === -1){
    throw Error('Invalid review_id');
  }

  return insert_id;

}





module.exports = {
  add
};
