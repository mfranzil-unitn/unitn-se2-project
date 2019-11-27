const Line = require('@app/models/line');

async function place(line) {
  if (!line) {
      throw new Error('Line parameter required.');
  }

  if (!line.start_lat || !line.end_lat || !line.start_lon || !line.end_lon) {
    throw new Error('Please enter keys start_lat, end_lat, start_lon, end_lon.');
  }
  Line.create(line);

  return;
}

async function getAll() {
  return Line.getAll();
}

module.exports = {
  place,
  getAll
};
