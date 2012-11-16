Wrapper for [ipinfodb.com](http://www.ipinfodb.com/ip_location_api.php)'s IP geolocation API.

# Install

    npm install ipinfodb

# Usage

```javascript
var key = '....';
client = require('ipinfodb')({ key: key });

client.geolocate('106.186.17.133', function (err, res) {
  console.log(res);
});

client.ip2timezoneOffset('106.186.17.133', function (err, timezoneOffset) {
  console.log(timezoneOffset);
});
```
