const { argv } = require('yargs');
const yargs = require('yargs');
const loadAirportCodes = require('./airportcodesCreator');
const createMeterReports = require('./metarReportGenerator');
const parse = require('./parser');
const converter = require('./utils/converter');
const mathUtil = require('./utils/mathUtil');

//const metarReports = createMeterReports(1000000);
//console.log(metarReports);

const airportStats = new Map();
const computeAndDisplayStats = function(metarReports) {
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

yargs.command({
    command: 'add',
    description: 'Add a note',
    builder: {
        title: {
            description: 'Note description',
            demandOption: true,
            type: 'string'
        },
        body: {
            description: 'Note Body Descrition',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv) {
        console.log('Adding the note');
        console.log("Title: " + argv.title);
        console.log("Body:" + argv.body);
    }
})

yargs.command({
    command: 'generate',
    description: 'Generating random reports',
    builder: {
        count: {
            description: 'Total number of reports to be generated.',
            demandOption: true,
            type: 'number'
        }
    },
    handler: function() {
        console.log('Generating random reports');
        console.log("Count: " + argv.count);
        const metarReports = createMeterReports(argv.count);
        metarReports.forEach( x => {
            console.log(x);
        })
    }
})

yargs.command({
    command: 'stats',
    description: 'Read report stream and compute stats',
    builder: {
        count: {
            description: 'Total number of reports to be generated.',
            demandOption: true,
            type: 'number'
        }
    },
    handler: function() {
        console.log('Generating random reports');
        console.log("Count: " + argv.count);
        const metarReports = createMeterReports(argv.count);
        computeAndDisplayStats(metarReports);
    }
})

yargs.parse();