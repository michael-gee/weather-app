const request = require('request');

//CURRENT LOCATION AND WEATHER API FOR OTHER APP
var userDetails = {
  //latitude / longitude
  //city / regionName (state/province/etc) / country
  //temperature info
};

module.exports.weatherRequest = (userIp) => {
  return new Promise((resolve, reject) => {
    request({
      url: `http://ip-api.com/json/${userIp}`,
      json: true
    }, (error, response, body) => {
      if(error) {
        reject(error);
        return;
      } else if(body.status === "fail"){
        reject("Could not find the location of inputted IP Adress.");
        return;
      }
      userDetails.latitude = body.lat;
      userDetails.longitude = body.lon;
      userDetails.city = body.city;
      userDetails.country = body.country;
      userDetails.region = body.regionName;

      request({
        url: `http://api.openweathermap.org/data/2.5/weather?lat=${userDetails.latitude}&lon=${userDetails.longitude}&units=imperial&APPID=117e8da915f32dc47a7976b186284f7f`,
        json: true
      }, (error, response, body) => {
        if(error) {
          reject(error);
          return;
        } else if(body.cod != 200) {
           reject(body.message);
           return;
        } else if(body.cod == 200) {
          userDetails.currentTemp = body.main.temp
        }
      });

      //GET USER WEATHER API REQUEST
      request({
        url: `http://api.openweathermap.org/data/2.5/forecast/daily?lat=${userDetails.latitude}&lon=${userDetails.longitude}&cnt=5&units=imperial&APPID=117e8da915f32dc47a7976b186284f7f`,
        json: true
      }, (error,response,body) => {
        if(error) {
          reject(error);
          return;
        } else if(body.cod !== "200") {
           reject(body.message);
           return;
        } else if(body.cod === "200") {
          resolve({
            //Location Information
            longitude: body.city.coord.lon,
            latitude: body.city.coord.lat,
            city: userDetails.city,
            country: userDetails.country,
            region: userDetails.region,
            //Weather Information
            currentTemp: userDetails.currentTemp
          });
        }
      });
    });
  });
}
