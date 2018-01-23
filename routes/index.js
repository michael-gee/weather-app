const express = require('express');
const router = express.Router();
const middleware = require('../middleware/getWeather');

router.get('/', middleware.getWeather, function(req, res, next) {
  console.log(res.body);
  const weatherInfo = {
    city: res.body.city,
    country: res.body.country,
    region: res.body.region,
    weatherSummary: res.body.weatherSummary,
    currentTemp: parseInt(res.body.currentTemp),
    icon: res.body.currentWeatherIcon
  };
  res.render('index', weatherInfo);
});

router.get('/weather/:ip', middleware.getWeather, function (req, res, next) {
  res.render('index');
});

router.get('/about', function (req, res, next) {
  res.render('about');
});

router.get('/search', function (req, res, next) {
  res.render('search');
});

router.get('/search/:id', function (req, res, next) {
  res.render('search');
});

module.exports = router;