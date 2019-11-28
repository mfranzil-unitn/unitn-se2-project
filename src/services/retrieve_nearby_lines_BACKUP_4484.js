const ServicesLine = require('@app/services/lines');

<<<<<<< HEAD
async function retrieve(point) {
    
    let lat = point.lat;
    let lon = point.lon;
    let rad = 0.0013; /* Circa 0.1 km */ 

    if ( !lat || !lon ) {
        throw new Error ("Missing latitude or longitude")
=======
async function retrieve(lat, lon, rad = 0.0013 /* Circa 0.1 km  */) {
    if (!lat || !lon) {
        throw new Error("Missing latitude or longitude")
>>>>>>> 253455f9a778b9521f161eeacad696d416349d3d
    }

    let existing_lines = await ServicesLine.getAll();
    console.log(existing_lines);
    let nearby_lines = [];

<<<<<<< HEAD


    /*existing_lines.forEach(element => {
        if ( ( (Math.abs(element.start_lat - lat) < rad ) && (Math.abs(element.start_lon - lon) < rad ) ) || ( ( Math.abs(element.end_lat - lat) < rad ) && (Math.abs(element.end_lon - lon) < rad) ) ) {
=======
    existing_lines.forEach(element => {
        if (((Math.abs(element.start_lat - lat) < rad) && (Math.abs(element.start_lon - lon) < rad))
            || ((Math.abs(element.end_lat - lat) < rad) && (Math.abs(element.end_lon - lon) < rad))) {
>>>>>>> 253455f9a778b9521f161eeacad696d416349d3d
            nearby_lines.push(element);
        }
    })*/

    for ( let i=0; i<existing_lines.length; i++ ){
        if ( ( (Math.abs(existing_lines[i].start_lat - lat) < rad ) && (Math.abs(existing_lines[i].start_lon - lon) < rad ) ) || ( ( Math.abs(existing_lines[i].end_lat - lat) < rad ) && (Math.abs(existing_lines[i].end_lon - lon) < rad) ) ) {
            nearby_lines.push(existing_lines[i]);
        }
    }

    return nearby_lines;
}

module.exports = {
    retrieve
};