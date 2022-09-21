const { argv } = require('yargs');
const yargs = require('yargs');
const loadAirportCodes = require('./airportcodesCreator');
const createMeterReports = require('./metarReportGenerator');
const calculateStats = require('./statsCalculator')
const converter = require('./utils/converter');
const mathUtil = require('./utils/mathUtil');

/**
 * command: generate
 * Purpose: For generating random metar reports
 * arguments: count - total count of random reports to be generated
 * example: node src/app.js generate --count=100
 */
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

/**
 * command: stats
 * Purpose: Generates random metar reports and then reads one by one to compute stats like running avegare wind speed and current speed.
 * arguments: count -> total count of random reports to be generated
 * example: node src/app.js stats --count=1000
 */
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
        calculateStats(metarReports);
    }
})

yargs.parse();