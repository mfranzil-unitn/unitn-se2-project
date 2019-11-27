let lines = [];

async function create(line) {
  //Create and save line
  console.log(line);
}

async function getAll() {
  return lines;
}

module.exports = {
  create,
  getAll
};
