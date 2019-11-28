const Line = require('@app/models/line');

async function retrieve(lat, long, rad = 0.0013 /* Circa 0.1 km  */) {

    if ( !lat || !lon ) {
        throw new Error ("Missing latitude or longitude")
    }

    let existing_lines = Line.getAll();
    let nearby_lines = [];

    existing_lines.forEach(element => {
        if ( ( (Math.abs(element.start_lat - lat) < rad ) && (Math.abs(element.start_lon - lon) < rad ) ) || ( ( Math.abs(element.end_lat - lat) < rad ) && (Math.abs(element.end_lon - lon) < rad) ) ) {
            nearby_lines.push(element);
        }
    });

    return nearby_lines;
}

module.exports = {
    retrieve
  };