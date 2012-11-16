/**
 * opts:
 * - key : API key
 * - endpoint : (optional) API base URL
 */
var http = require('http'),
  qs = require('querystring'),
  path = require('path');

function Client(opts) {
  this.key = opts.key;
  this.endpoint = (opts.endpoint) ? opts.endpoint : 'http://api.ipinfodb.com/v3/ip-city/';
}

Client.prototype.geolocate = function (ip, cb) {
  var query = {
    key: this.key,
    ip: ip,
    format: 'json'
  }
  var url = this.endpoint + '?' + qs.stringify(query);
  http.get(url, function (res) {
    res.on('data', function (data) {
      try {
        var data = JSON.parse(data);
        cb(null, data);
      }
      catch (err) {
        cb(err);
      }
    });
  }).on('error', function (err) {
    cb(err);
  });;
}
function timezone2timezoneOffset(timezone) {
  //console.log(timezone);
  if (timezone.length <= 1) return 0;
  timezone = timezone.split(':');
  var hours = parseInt(timezone[0], 10);
  var minutes = parseInt(timezone[1], 10);
  if (hours < 0) minutes = -minutes;
  // convert to minutes
  return -1 * (hours * 60 + minutes);
};

Client.prototype.ip2timezoneOffset = function (ip, cb) {
  this.geolocate(ip, function (err, res) {
    if (err) return cb(err);
    cb(null, timezone2timezoneOffset(res.timeZone));
  });
}

module.exports = function (opts) {
  return new Client(opts);
}
