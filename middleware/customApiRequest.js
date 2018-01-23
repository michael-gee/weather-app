const request = require('request');

// ***Fetch User IP Address Request
module.exports.getUserIp = (userIp) => {

  // Check if specific IP address was passed, if not get user's local IP Address
  if(userIp === undefined) {
    return new Promise((resolve, reject) => {
      request({
        url: `http://ip-api.com/json`,
        json: true
      }, (error, response, body) => {
        if (error) {
          reject(error);
        } else if (body.status === "fail") {
          reject("Could not find the location of inputted IP Adress.");
        } else if (body.status === "success") {
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
  } else {
      return new Promise((resolve, reject) => {
        request({
          url: `http://ip-api.com/json/${userIp}`,
          json: true
        }, (error, response, body) => {
          if (error) {
            reject(error);
          } else if (body.status === "fail") {
            reject("Could not find the location of inputted IP Adress.");
          } else if (body.status === "success") {
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
}

// ***Fetch Current Weather Request
module.exports.getCurrentWeather = (data) => {

  return new Promise((resolve, reject) => {
    request({
      url: `https://api.darksky.net/forecast/ed20cc913806c6b56c99a88cdb09f1fc/${data.latitude},${data.longitude}?exclude=minutely,daily,hourly,flags`,
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
        data.currentWeatherIcon = body.currently.icon;
        resolve(data);
      }
    });
  });

}

module.exports.getRestOfDayWeather = (data) => {

  return new Promise((resolve, reject) => {
    request({
      url: `https://api.darksky.net/forecast/ed20cc913806c6b56c99a88cdb09f1fc/${data.latitude},${data.longitude}?exclude=minutely,currently,hourly,flags`,
      json: true
    }, (error, response, body) => {
      if(error) {
        reject(error);
      } else if(body === "Not Found") {
         reject("Request not found -- Check for correct API key and valid IP location before making request.");
      } else {
        data.fullDayWeather = body.daily.data;
        resolve(data);
      }
    });
  });

}

/*
// ***Fetch 5 Day Forecast Request
module.exports.getFiveDayForcast = (data) => {

  return new Promise((resolve, reject) => {
    request({
      url: `http://api.openweathermap.org/data/2.5/forecast/daily?lat=${data.latitude}&lon=${data.longitude}&cnt=5&units=imperial&APPID=117e8da915f32dc47a7976b186284f7f`,
      json: true
    }, (error,response,body) => {
      if(error) {
        reject(error);
      } else if(body.cod !== "200") {
         reject(body.message);
      } else if(body.cod === "200") {
        //Add 5 day forecast weather data to the "data" object here
        resolve(data);
      }
    });
  });

}

*/
