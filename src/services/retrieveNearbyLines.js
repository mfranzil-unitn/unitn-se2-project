const ServicesLine = require('@app/services/lines');

const { HTTPError } = require('@app/errors');
const Logger = require('winston');

async function retrieve(point) {
    let lat = point.lat;
    let lon = point.lon;
    const rad = 0.0013; /* Circa 0.1 km */

    if (!lat || !lon) {
        throw new HTTPError("Missing latitude or longitude", 400);
    }

    let existing_lines = await ServicesLine.getAll();
    let nearby_lines = [];

    for (let i = 0; i < existing_lines.length; i++) {
        if (((Math.abs(existing_lines[i].line_start_lat - lat) < rad) && (Math.abs(existing_lines[i].line_start_lon - lon) < rad))
            || ((Math.abs(existing_lines[i].line_end_lat - lat) < rad) && (Math.abs(existing_lines[i].line_end_lon - lon) < rad))) {
            Logger.info("Aggiunta linea con id " + existing_lines[i].line_id)
            nearby_lines.push(existing_lines[i]);
        }
    }

    return nearby_lines;
}

module.exports = {
    retrieve
};

