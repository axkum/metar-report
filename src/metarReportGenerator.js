const fs = require('fs');

const createTimestamp = function () {
    const day = Math.floor(Math.random() * 31 + 1);
    const time = Math.floor((Math.random() * 24));
    const hour = Math.floor(Math.random() * 60);
    const timestamp = padWithZero(day, 2) + padWithZero(time, 2) + padWithZero(hour, 2) + 'Z';
    return timestamp;
}
function padWithZero(num, targetLength) {
    return String(num).padStart(targetLength, '0');
}

const createWindInfo = function () {
    const direction = Math.floor(Math.random() * 1000);
    const speed = Math.floor(Math.random() * 100);
    const gust = Math.floor(Math.random() * 100);

    var windInfo = padWithZero(direction, 3) + padWithZero(speed, 2);
    if( Math.floor(Math.random() * 1000) % 2 < 1) {
        windInfo = windInfo + 'G' + padWithZero(gust, 2);
    }
    if( Math.floor(Math.random() * 1000) % 2 < 1) {
        windInfo = windInfo + 'MPS';
    } else {
        windInfo = windInfo + 'KT';
    }
    return windInfo;
}

const dataBuffer = fs.readFileSync('./resources/codes.txt');
const dataStr = dataBuffer.toString();
const icaoCodes = dataStr.split(','); 

const createICAOCode = function() { 
    return icaoCodes[Math.floor(Math.random() * 50)];
}

const createMeterReport = function() {
    return createICAOCode() + ' ' + createTimestamp() + ' ' + createWindInfo();;
}

const createMeterReports =  function(count) {
    const c = count > 0 ? count : 1;
    const reports = [];
    for (var i = 0; i < c; i++) {
        reports.push(createMeterReport());
    }
    return reports;
}

module.exports = createMeterReports;