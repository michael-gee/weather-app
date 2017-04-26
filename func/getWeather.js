const customApiRequest = require('./customApiRequest');

module.exports.getWeather = (currentIp) => {
  customApiRequest.getUserIp(currentIp)
  .then((response) => {
    return customApiRequest.getCurrentWeather(response);
  })
  .then((response) => {
    return customApiRequest.getRestOfDayWeather(response);
  })
  .then((response) => {
    console.log(response);
    return response;
  })
  .catch((error) => {
    console.log(error);
  });
}
