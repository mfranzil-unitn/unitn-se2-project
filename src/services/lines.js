const Line = require('@app/models/lines');

async function place(line) {
  if (!line) {
    throw new Error('Line parameter required.');
  }

  if (!line.name || !line.description || !line.start_lat || !line.end_lat || !line.start_lon || !line.end_lon) {
    throw new Error('Please enter keys name, description, start_lat, end_lat, start_lon, end_lon.');
  }
  await Line.create(line);

  return;
}

async function getAll() {
  let res = await Line.getAll();
  return res;
}

async function get(id) {
  let res = await Line.get(id);
  return res;
}

module.exports = {
  place,
  getAll,
  get
};
