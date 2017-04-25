const request = require('request');

// ***Fetch User IP Address Request
module.exports.getUserIp = (userIp) => {

  // Check if specific IP address was passed, if not get user's local IP Address
  if(userIp === undefined) {
    userIp = '';
  }

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
      } else if(body.status === "success") {
        resolve({
          latitude: body.lat,
          longitude: body.lon,
          city: body.city,
          country: body.country,
          region: body.regionName
        })
      }
    });
  });

}

// ***Fetch Current Weather Request
module.exports.getCurrentWeather = (data) => {

  return new Promise((resolve, reject) => {
    request({
      url: `http://api.openweathermap.org/data/2.5/weather?lat=${data.latitude}&lon=${data.longitude}&units=imperial&APPID=117e8da915f32dc47a7976b186284f7f`,
      json: true
    }, (error, response, body) => {
      if(error) {
        reject(error);
        return;
      } else if(body.cod != 200) {
         reject(body.message);
         return;
      } else if(body.cod == 200) {
        data.currentTemp = body.main.temp;
        resolve(data);
      }
    });
  });

}

// ***Fetch 5 Day Forecast Request
module.exports.getFiveDayForcast = (data) => {

  return new Promise((resolve, reject) => {
    request({
      url: `http://api.openweathermap.org/data/2.5/forecast/daily?lat=${data.latitude}&lon=${data.longitude}&cnt=5&units=imperial&APPID=117e8da915f32dc47a7976b186284f7f`,
      json: true
    }, (error,response,body) => {
      if(error) {
        reject(error);
        return;
      } else if(body.cod !== "200") {
         reject(body.message);
         return;
      } else if(body.cod === "200") {
        //Add 5 day forecast weather data to the "data" object here
        resolve(data);
      }
    });
  });

}
