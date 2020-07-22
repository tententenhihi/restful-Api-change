var http = require('http');
const delay = require('delay');
function doRequest(options, data) {
    return new Promise((resolve, reject) => {
      const req = http.request(options, (res) => {
        res.setEncoding('utf8');
        let responseBody = '';
  
        res.on('data', (chunk) => {
          responseBody += chunk;
        });
  
        res.on('end', () => {
          resolve(JSON.parse(responseBody));
        });
      });
  
      req.on('error', (err) => {
        reject(err);
      });
  
      if (data) {
        req.write(data);
      }
      req.end();
    });
  }
  var gettimezone = function (ip) {
    (async () => {
    var options3 = {
      host: 'pro.ip-api.com',
      path: '/json/'+ip+'?key=DcyaIbvQx69VZNA',
    }
    
          const data = await doRequest(options3);
         // console.log(data);
          return data;
      })();}
  module.exports.timezone = doRequest;