const customApiRequest = require('./customApiRequest');

module.exports.getWeather = (req, res, next) => {
  let currentIp;

  currentIp === req.params.ip ? currentIp = req.params.ip : currentIp = undefined;
  customApiRequest.getUserIp(currentIp)
    .then((response) => {
      return customApiRequest.getCurrentWeather(response);
    })
    .then((response) => {
      return customApiRequest.getRestOfDayWeather(response);
    })
    .then((response) => {
      //console.log(response);
      return response;
    })
    .then((response) => {
      res.body = response;
      next();
    })
    .catch((error) => {
      console.error(error);
      next(error);
    });
}
