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
      url: `http://api.openweathermap.org/data/2.5/weather?lat=${data.lat}&lon=${data.lon}&units=imperial&APPID=117e8da915f32dc47a7976b186284f7f`,
      json: true
    }, (error, response, body) => {
      if(error) {
        reject(error);
      } else if(body.cod != 200) {
         reject(body.message);
      } else if(body.cod == 200) {
        data.currentTemp = body.main.temp;
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
  // FORMAT THE RESPONSE DATA SENT FROM WEATHER API
  console.log(response);
})
.catch((error) => {
  console.log(error);
});
