const math =  {
    calculateRunningAverage : function(avg, newValue, count) {
        const newAvg = avg * (count-1)/count + newValue/count;
        return Math.round(newAvg * 100) / 100;
    },

    decimalRound : function(num) {
        return Math.round(num * 100) / 100;
    }
}

module.exports = math;