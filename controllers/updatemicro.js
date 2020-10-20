const db = require("../models");
const Sequelize = require("sequelize");
const Ipadress = require("../ip");
const requestIp = require('request-ip');
const http = require('http');
const http1 = require('https');
const { range } = require("delay");
const { int } = require("random");
function doRequest(options, data) {
  return new Promise((resolve, reject) => {
    const req = http1.request(options, (res) => {
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
function geo(userapi, keyapi) {

  (async () => {
    try {
      const data = await doRequest('https://shifter.io' + '/api/v1/backconnect/' + userapi + '/geo/?api_token=' + keyapi);
      if (data.code == 200) {
       
        return data;
      }
    } catch (error) {
      console.error(error);
    }
  })();
}
exports.micro = async (req, res) => {
  var ip = req.clientIp;
  var keyapi = req.body.key;
  var userapi = req.body.user;
  if (ip.substr(0, 7) == "::ffff:") {
    ip = ip.substr(7)
  }
  try {

    const data = await doRequest('https://shifter.io' + '/api/v1/backconnect/' + userapi + '/proxies/?api_token=' + keyapi);
    const datageo = await doRequest('https://shifter.io' + '/api/v1/backconnect/' + userapi + '/geo/?api_token=' + keyapi);
    var advangeo=datageo.advanced_geo;
    var listgeo=datageo.data;
    advangeo.forEach(element => {
      element.split(':')[2]
    });
  let arraygeo= [];
    listgeo.forEach(element1 => {
      advangeo.forEach(element2 => {
        if(element2.includes(element1)){
          var vt1=element2.split(':')[0];
          var vt2=element2.split(':')[1];
          if(vt2>vt1){
            for(var i=0;i<=vt2-vt1;i++){
              arraygeo.push(eval(vt1+i)+':'+element1);
            }
          }else{
            arraygeo.push(element2.split(':')[0]+':'+element1);
          }
        }
      });
    });
    var arraydata=[];
    if (data.code == 200) {
      var xoahet="DELETE FROM `micro` WHERE `userkey`='"+userapi+"'";
       db.sequelize.query(xoahet,{nest: true,type:Sequelize.QueryTypes.DELETE});
      
      arraygeo.forEach(element => {
        arraydata.push(data.data[0].split(':')[0]+':'+element);
      });
      arraydata.forEach(element => {
        var insert="INSERT INTO `micro`(`userkey`, `apikey`, `thongtin`) VALUES ('"+userapi+"','"+keyapi+"','"+element+"')";
         db.sequelize.query(insert,{nest: true,type:Sequelize.QueryTypes.INSERT});
      });
      //var datadone=({"data":arraygeo})
      res.status(200).send("success");
    }
  } catch (error) {
    console.error(error);
  }

}