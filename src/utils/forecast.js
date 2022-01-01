const request = require("request");

const forecast = (lat, long, callback) => {
    const url = `https://api.darksky.net/forecast/49a7c2c5a18c2dc09ada2a52cf856936/${lat},${long}?units=ca`;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to weather service", undefined);
        } else if (body.error) {
            callback("weather report not available for this geo code", undefined);
        } else {
            callback(undefined, { data: body });
        }
    })
}

module.exports = forecast;