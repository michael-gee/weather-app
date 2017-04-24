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

var address = encodeURIComponent(argv.a), lon, lat;

request({
  url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}`,
  json: true
}, (error, response, body) => {
  if(error) console.log(error);
  console.log(`Address: ${body.results[0].formatted_address}`);
  lon = body.results[0].geometry.location.lng;
  lat = body.results[0].geometry.location.lat;

  console.log("Longitude: ", lon);
  console.log("Latitude: ", lat);

  request({
    url: `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&APPID=117e8da915f32dc47a7976b186284f7f`
  }, (error, response, body) => {
    if(error) console.log(error);
    console.log(JSON.parse(body));
  })



});
