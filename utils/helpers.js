exports.metricToImperial = function toFeet(n) {
    let realFeet = ((n*0.393700) / 12);
    let feet = Math.floor(realFeet);
    let inches = ((realFeet - feet) * 12).toFixed(2);
    return feet + "feet, " + inches + 'inches';
}