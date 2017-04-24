const weather = require('./func/weather');

var currentIp = '';

weather.weatherRequest(currentIp)
.then((res) => {
  console.log(res);
})
.catch((errorMessage) => {
  console.log(errorMessage);
});
