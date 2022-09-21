const parse = require('./parser');
const mathUtil = require('./utils/mathUtil');

const calculateStats = function(metarReports) {
    console.log('Computing running average...');
    const airportStats = new Map();
    metarReports.forEach(x => {
        const metarReportObj = parse(x);
        let stats = new Object();
        const icaoCode = metarReportObj.icao_code;
        if (airportStats.has(icaoCode)) {    
            stats = airportStats.get(icaoCode);
            const speed = metarReportObj.wind_info.speed;
            const oldAvgSpeed = stats.avg_speed;
            const count = stats.count;
            const avgSpeed = mathUtil.calculateRunningAverage(oldAvgSpeed, speed, count);
            stats.avg_speed = avgSpeed;
            stats.count = count + 1;
        } else {
            stats.avg_speed = metarReportObj.wind_info.speed;
            stats.count = 1;
            stats.current_speed = metarReportObj.wind_info.speed;
            airportStats.set(icaoCode, stats);
        }
        //console.log(metarReportObj);
        console.log('-----------------------------')
        console.log('Airport Name: ' + icaoCode + '  Running Speed:' + stats.avg_speed + ' Current Speed: ' + stats.current_speed);
    });
    displayFinalResult(airportStats);
}

const displayFinalResult = function(airportStats) {
    console.log('---------------- Final Report ----------------------');
    airportStats.forEach((value, key) => {
        console.log('----------');
        console.log('Airport Name: ' + key + '  Average Speed:' + value.avg_speed + ' Current Speed: ' + value.current_speed);
    });
}

module.exports = calculateStats;