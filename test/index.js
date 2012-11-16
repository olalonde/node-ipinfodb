var key = require('./key'),
  client = require('../')({ key: key });

client.ip2timezoneOffset('106.186.17.133', function (err, timezoneOffset) {
  console.log(timezoneOffset);
});
