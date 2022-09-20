const fs = require('fs');

const loadAirportCodes = function () {
    const dataBuffer = fs.readFileSync('./resources/airport-codes.json');
    const dataStr = dataBuffer.toString();
    const dataJson = JSON.parse(dataStr);
    //console.log(dataJson);
    let codes = new Array();
    for (let x in dataJson) {
        if(dataJson[x].gps_code !== null && !(/[^a-zA-Z]/.test(dataJson[x].gps_code))) {
            //console.log(dataJson[x].gps_code);
            codes.push(dataJson[x].gps_code);
        }
    }
    console.log(codes);
    fs.writeFileSync('./resources/codes.txt', codes.join());
}

module.exports = loadAirportCodes;