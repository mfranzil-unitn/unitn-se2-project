let lines = [];
let id = 0;

class Line {
    constructor(name, description, start_lat, start_lon, end_lat, end_lon) {
        this.id = id++;
        this.name = name;
        this.description = description;
        this.start_lat = parseFloat(start_lat);
        this.start_lon = parseFloat(start_lon);
        this.end_lat = parseFloat(end_lat);
        this.end_lon = parseFloat(end_lon);
    }
}

async function create(line) {
  //Create and save line
  lines.push(new Line(line.name, line.description, line.start_lat, line.start_lon, line.end_lat, line.end_lon));
  console.log("A new line has been added");
}

async function getAll() {
  return lines;
}

async function get(id) {
  console.log("ID: " + id);
  let result;
  lines.forEach(function(item) {
    if(item.id === parseFloat(id)){
      console.log(item);
      result = item;
    }
  });
  return result;
}

module.exports = {
  create,
  getAll,
  get
};
