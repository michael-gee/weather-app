const request = require('request');
const yargs = require('yargs');

const argv = yargs
  .usage('Run Command: node $0 -a "<yourAddressHere>"')
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address - must be surrounded by quotes " "',
      string: true
    }
})
.help()
.alias('help', 'h')
.argv;

function getUserLocation(userAddress) {

  userAddress = encodeURIComponent(userAddress);

  return new Promise((resolve, reject) => {
    request({
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${userAddress}`,
      json: true
    }, (error, response, body) => {
      if(error){
        reject(error);
      } else if(body.status === "ZERO_RESULTS") {
        reject("invalid address, location not found.");
      } else if(body.status === "OK") {
        resolve({
          lat: body.results[0].geometry.location.lat,
          lon: body.results[0].geometry.location.lng,
          address: body.results[0].formatted_address
        });
      }
    });
  });
}

function getWeather(data) {

  return new Promise((resolve, reject) => {
    request({
      url: `https://api.darksky.net/forecast/ed20cc913806c6b56c99a88cdb09f1fc/${data.lat},${data.lon}?exclude=minutely,daily,hourly,flags`,
      json: true
    }, (error, response, body) => {
      if(error) {
        reject(error);
      } else if(body === "Not Found") {
         reject("Request not found -- Check for correct API key and valid IP location before making request.");
      } else {
        data.weatherSummary = body.currently.summary;
        data.currentTemp = body.currently.temperature;
        data.currentApparentTemp = body.currently.apparentTemperature;
        resolve(data);
      }
    });
  });
}

getUserLocation(argv.a)
.then((response) => {
  return getWeather(response);
})
.then((response) => {
  console.log('');
  console.log('');
  console.log("**********     Current Weather     **********");
  console.log('');
  console.log(`Location: ${response.address}`);
  console.log('');
  console.log(`It is ${response.weatherSummary} outside.`);
  console.log('');
  console.log(`Temperature is currently ${response.currentTemp}°F --- Feels like ${response.currentApparentTemp}°F`);
  console.log('');
  console.log('');
})
.catch((error) => {
  console.log(error);
});
