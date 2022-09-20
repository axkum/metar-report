const converter = require('./utils/converter')

const parse = function (metar) {
    const metarReport = new Object();
    metarReport.metar_report = metar;
    const metarArray = metar.trim().split(' ');
    metarReport.icao_code = metarArray[0];
    metarReport.timestamp = parseTimestamp(metarArray[1]);
    metarReport.wind_info = parseWindInfo(metarArray[2]);
    return metarReport;
}

const parseTimestamp = function(ts) {
    const timestamp = new Object();
    timestamp.day_of_month = ts.slice(0,2);
    timestamp.hours = ts.slice(2,4);
    timestamp.minutes = ts.slice(4,6);
    return timestamp;
}

const parseWindInfo = function(wi) {
    const mode = (wi.match(/(MPS)$/) && wi.match(/G/)) ? 'MPS-G' 
                    : ((wi.match(/(KT)$/) && wi.match(/G/)) ? 'KT-G' 
                    : (wi.match(/(MPS)$/) ? 'MPS' : 'KT'));

    const windInfo = new Object();
    switch (mode) {
        case 'MPS-G':
            //console.log('MPS-G');
            windInfo.direction = wi.slice(0,3);
            var ind = wi.indexOf('G');
            windInfo.speed = wi.slice(3,ind);
            windInfo.gusts = wi.slice(ind, ind+3);
            windInfo.unit = 'MPS';
            break;
        case 'KT-G':
            windInfo.direction = wi.slice(0,3);
            var ind = wi.indexOf('G');
            windInfo.speed = converter.ktToMps(wi.slice(3,ind));
            windInfo.gusts = wi.slice(ind, ind+3);
            windInfo.unit = 'MPS';
            break;
        case 'MPS':
            windInfo.direction = wi.slice(0,3);
            var ind = wi.indexOf('MPS');
            windInfo.speed = wi.slice(3,ind);
            windInfo.unit = 'MPS';
            break;
        case 'KT':
            windInfo.direction = wi.slice(0,3);
            var ind = wi.indexOf('KT');
            windInfo.speed = converter.ktToMps(wi.slice(3,ind));
            windInfo.unit = 'MPS';
            break;
    }
    //console.log(mode);
    return windInfo;
 }

module.exports = parse;