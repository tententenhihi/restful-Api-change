const db = require("../models");
const Sequelize = require("sequelize");
const { user } = require("../models");
const { randomBytes } = require("crypto");
const randomstring = require("randomstring");
const random = require('random');
const namedv=require("../fake/randomNameDevice");
const { Console } = require("console");
const sha1 = require('js-sha1');
const Ipadress=require("../ip");
const requestIp = require('request-ip');
const https = require('http');
const timezone=require("../timezone");
const { and } = require("sequelize");
const performance = require('perf_hooks').performance;

//var nodemailer = require('nodemailer');
//const mailsent=require("../mailOptions");
exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  
  exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
  };
  
  exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
  };
  
  exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
  };

  exports.getssh = (req, res) => {
    const User = db.sequelize.define("svssh", {
      username: {
        type: db.Sequelize.STRING
      },
      email: {
        type: db.Sequelize.STRING
      },
      password: {
        type: db.Sequelize.STRING
      }
    });
    User.findAll().then(function(User) {
      res.status(200).send(User);
    });
  };
  function h2d(s) {

    function add(x, y) {
        var c = 0, r = [];
        var x = x.split('').map(Number);
        var y = y.split('').map(Number);
        while(x.length || y.length) {
            var s = (x.pop() || 0) + (y.pop() || 0) + c;
            r.unshift(s < 10 ? s : s - 10); 
            c = s < 10 ? 0 : 1;
        }
        if(c) r.unshift(c);
        return r.join('');
    }

    var dec = '0';
    s.split('').forEach(function(chr) {
        var n = parseInt(chr, 16);
        for(var t = 8; t; t >>= 1) {
            dec = add(dec, dec);
            if(n & t) dec = add(dec, '1');
        }
    });
    return dec;
}
  var FK_BLUETOOTH_ADDR = "XX:XX:XX:XX:XX:XX".replace(/X/g, function() {
    return "0123456789ABCDEF".charAt(Math.floor(Math.random() * 16)).toLowerCase();
  });	
  var FK_SN = "XXXXXXXXXXXX".replace(/X/g, function() {
    return "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(Math.floor(Math.random() * 16));
  });
  var FK_MLBSN = "XXXXXXXXXXXXXXXX".replace(/X/g, function() {
    return "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(Math.floor(Math.random() * 16));
  });
  var FK_ECID = "0x00XXXXXXXXXXXXXX".replace(/X/g, function() {
    return "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(Math.floor(Math.random() * 16));
  });
  var FK_WIFI_ADDR = FK_BLUETOOTH_ADDR.slice(0,-2) + "XX".replace(/X/g, function() {
    return "0123456789ABCDEF".charAt(Math.floor(Math.random() * 16)).toLowerCase();
  });	
  function imei_gen() {
    var pos;
    var str = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    var sum = 0;
    var final_digit = 0;
    var t = 0;
    var len_offset = 0;
    var len = 15;
    var issuer;
    var rbi = ["01","10","30","33","35","44","45","49","50","51","52","53","54","86","91","98","99"];
    var arr = rbi[Math.floor(Math.random() * rbi.length)].split("");
    str[0] = Number(arr[0]);
    str[1] = Number(arr[1]);
    pos = 2;
    while (pos < len - 1) {
        str[pos++] = Math.floor(Math.random() * 10) % 10;
    }
    len_offset = (len + 1) % 2;
    for (pos = 0; pos < len - 1; pos++) {
        if ((pos + len_offset) % 2) {
            t = str[pos] * 2;
            if (t > 9) {
                t -= 9;
            }
            sum += t;
        }
        else {
            sum += str[pos];
        }
    }

    //
    // Choose the last digit so that it causes the entire string to pass the checksum.
    //

    final_digit = (10 - (sum % 10)) % 10;
    str[len - 1] = final_digit;

    // Output the IMEI value.
    t = str.join('');
    t = t.substr(0, len);

    return t;
}
function generateUUID() { // Public Domain/MIT
  var d = new Date().getTime();//Timestamp
  var d2 = (performance && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16;//random number between 0 and 16
      if(d > 0){//Use timestamp until depleted
          r = (d + r)%16 | 0;
          d = Math.floor(d/16);
      } else {//Use microseconds since page-load if supported
          r = (d2 + r)%16 | 0;
          d2 = Math.floor(d2/16);
      }
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}
var FK_IMEI = imei_gen();
function serial(){
  var array =["DX","FN","F2","FY","FK","FV","F8","DA","FT","KV","KT","KG","NK","NY","NQ"];
  var randomserial=randomstring.generate(10);
  var randomint=random.int(0,array.length-1);
  var s=array[randomint]+randomserial.toUpperCase();
  return s;
}
function random3g4g(){
  var array =["WiFI","3G","4G"];
  var chon;
  var phantram=random.int(0,100);
  if(phantram<=50){
    chon=array[0];
  }else if(phantram<=65 && phantram>50){
    chon=array[1];
  }else if(phantram>65 && phantram<=100){
    chon=array[2];
  }
  return chon;
}
var DeviceToken=randomstring.generate(64);
function getUDID(){
  
  var imeiConvert = h2d(FK_IMEI);
	var uuidStringBeforeSha1 = FK_SN + imeiConvert + FK_WIFI_ADDR + FK_BLUETOOTH_ADDR;
  var FK_UDID = sha1(uuidStringBeforeSha1);
  return FK_UDID;
}

function randomdungluong(a,b,c){
  var arraya=[a,b,c];
  return arraya[random.int(0,2)];
}
//var dungluong6s=randomdungluong(a,b,c);
function dungluongmacdinh(HWModelStr){
  var dungluonga;
  switch (HWModelStr) {
      case "iPhone8,1":
      case "iPhone8,2":
      case "iPhone8,4":
        dungluonga = randomdungluong(16000000000,32000000000,64000000000);
        break;
      case "iPhone9,1":
      case "iPhone9,2":
      case "iPhone9,3":
      case "iPhone9,4":
        dungluonga = randomdungluong(32000000000,128000000000,256000000000);
        break;
      case "iPhone10,1":
      case "iPhone10,2":
      case "iPhone10,3":
      case "iPhone10,4":
      case "iPhone10,5":
      case "iPhone10,6":
        dungluonga = randomdungluong(64000000000,256000000000,64000000000);
        break;
      case "iPhone11,8":
      case "iPhone12,1":
      case "iPhone12,8":
        dungluonga = randomdungluong(64000000000,128000000000,256000000000);
      case "iPhone11,2":
      case "iPhone11,6":
      case "iPhone12,3":
      case "iPhone12,5":
        dungluonga = randomdungluong(64000000000,256000000000,512000000000);
      default: 
      dungluonga = 64000000000;

  }
  return dungluonga;
}
function getcpu(HWModelStr){
  var cpu;
  switch (HWModelStr) {
      case "iPhone8,1":
      case "iPhone8,2":
      case "iPhone8,4":
      case "iPhone9,1":
      case "iPhone9,2":
      case "iPhone9,3":
      case "iPhone9,4":
      case "iPhone10,1":
      case "iPhone10,2":
      case "iPhone10,3":
      case "iPhone10,4":
      case "iPhone10,5":
      case "iPhone10,6":
        cpu = "armv7";
        break;
      case "iPhone11,8":
      case "iPhone12,1":
      case "iPhone12,8":
      case "iPhone11,2":
      case "iPhone11,6":
      case "iPhone12,3":
      case "iPhone12,5":
      case "iPhone11,4": 
        cpu="arm64";
      default: 
      cpu = "arm64";

  }
  return cpu;
}
//var getTotalDiskCapacity=dungluongmacdinh(HWModelStr);
var UDID=getUDID();
  exports.SELECT = async(req, res) => {
    const info =await db.sequelize.query(
      'SELECT os.OSVersion AS \'ProductVersion\',model.HWModel AS \'HWModelStr\',model.Platform AS \'HardwarePlatform\',os.Build AS \'BuildVersion\',model.HWMachine AS \'ProductType\',model.BDID AS \'BoardId\',os.utsname_Systemversion AS \'Systemversion\',os.UserAgent AS \'UA\',os.utsname_Releasenumber AS \'Releasenumber\',model.CPID,model.CpuFreq,model.MemorySize,model.ScreenHeight,model.ScreenWidth,model.ResolutionHeight,model.ResolutionWidth FROM os,model ORDER BY RAND() LIMIT 1',
      {
      nest: true,
       type:Sequelize.SELECT
      }
    );
    //  console.log(uuid());
    var getserial=serial();
    var name=namedv.namedevice().trim();
    var SSIDInfo=namedv.devicename().trim();
    var ProductVersion1=info[0]['ProductVersion'];
    ProductVersion=ProductVersion1.toString();
    var xylyProductVersion=ProductVersion.split('.');
    var MajorVersion,MinorVersion,PatchVersion;
    var dem=xylyProductVersion.length;
    if(dem==3){
      MajorVersion=xylyProductVersion[0];
      MinorVersion=xylyProductVersion[1];
      PatchVersion=xylyProductVersion[2];
    }else{
      MajorVersion=xylyProductVersion[0];
      MinorVersion=xylyProductVersion[1];
      PatchVersion=0;
    }
    var HWModelStr=info[0]['HWModelStr'];
    var HardwarePlatform=info[0]['HardwarePlatform'];
    var BuildVersion=info[0]['BuildVersion'];
    var ProductType=info[0]['ProductType'];
    var BoardId=info[0]['BoardId'];
    var Systemversion=info[0]['Systemversion'];
    var UA=info[0]['UA'];
    var Releasenumber=info[0]['Releasenumber'];
    var CPID=info[0]['CPID'];
    var CpuFreq=info[0]['CpuFreq'];
    var MemorySize=info[0]['MemorySize'];
    var ScreenHeight=info[0]['ScreenHeight'];
    var ScreenWidth=info[0]['ScreenWidth'];
    var ResolutionHeight=info[0]['ResolutionHeight'];
    var ResolutionWidth=info[0]['ResolutionWidth'];
    
    var FK_BLUETOOTH_ADDR = "XX:XX:XX:XX:XX:XX".replace(/X/g, function() {
      return "0123456789ABCDEF".charAt(Math.floor(Math.random() * 16)).toLowerCase();
    });	
    var FK_WIFI_ADDR = FK_BLUETOOTH_ADDR.slice(0,-2) + "XX".replace(/X/g, function() {
      return "0123456789ABCDEF".charAt(Math.floor(Math.random() * 16)).toLowerCase();
    });
    var FK_ECID = "0x00XXXXXXXXXXXXXX".replace(/X/g, function() {
      return "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(Math.floor(Math.random() * 16));
    });
    
    var FK_IMEI = imei_gen();
   var dl= dungluongmacdinh(ProductType);
      var ip = req.clientIp;
      
      if (ip.substr(0, 7) == "::ffff:") {
        ip = ip.substr(7)
      }
      var ip2 =ip;
      var options = {
        host: 'pro.ip-api.com',
        path: '/json/'+'116.109.194.124'+'?fields=status,message,continent,continentCode,country,countryCode,region,regionName,city,district,zip,lat,lon,timezone,offset,currency,isp,org,as,asname,reverse,mobile,proxy,hosting,query&key=DcyaIbvQx69VZNA',
      }
     var rs=await timezone.timezone(options);
     if(rs["status"]=="fail"){
      var data = 	({
        "status":"Fail"
      });
     }else{
      var city=rs["city"];
      var country=rs["country"];
      var countryCode=rs["countryCode"];
      var isp=rs["isp"];
      var lat=rs["lat"];
      var lon=rs["lon"];
      var org=rs["org"];
      var region=rs["region"];
      var regionName=rs["regionName"];
      var timezoneb=rs["timezone"];
      var zip=rs["zip"];
      var offset=rs["offset"];
      var proxy=rs["proxy"];
      var brightnessLevel=Math.random();
      brightnessLevel=brightnessLevel.toFixed(7);
      var lang;
      try{
        const language=await db.sequelize.query(
          "SELECT `LanguageCode` FROM `language` WHERE `Code`='"+countryCode+"'",
          {
          nest: true,
           type:Sequelize.SELECT
          }
        );
        lang=language[0]["LanguageCode"];
      }catch{
        lang="en-US";
      }
      var iso639=lang.split('-')[0];
      const mvc =await db.sequelize.query(
        "SELECT `MCC`,`MNC`,`Network` FROM `carrier` WHERE `ISO`='"+countryCode+"'",
        {
        nest: true,
         type:Sequelize.SELECT
        }
      );
      var mvcxuly=mvc[Math.floor(Math.random() * (mvc.length-1))]
      var MobileSubscriberCountryCode=mvcxuly["MCC"];
      var MobileSubscriberNetworkCode=mvcxuly["MNC"];
      var Network=mvcxuly["Network"];
        var data = 	({
 
         "SerialNumber": getserial,
         "DeviceName":  name,
         "UserAssignedDeviceName":name,
         "ProductVersion": ProductVersion1,
         "MajorVersion":MajorVersion,
         "MinorVersion":MinorVersion,
         "PatchVersion":PatchVersion,
         "CPUArchitecture": getcpu(ProductType),
         "HWModelStr":HWModelStr,
         "HardwarePlatform":HardwarePlatform,
         "BuildVersion":BuildVersion,
         "ProductType":ProductType,
         "BoardId":BoardId,
         "UniqueDeviceID":UDID,
         "IDFV":generateUUID().toUpperCase(),
         "IDFA":generateUUID().toUpperCase(),
         "AllowYouTube": "1", //random
         "AllowYouTubePlugin": "1",//random
         "AmountDataAvailable":Math.floor((Math.random() * 100000000000) + 10000000000),
         "AmountDataReserved":Math.floor((Math.random() * 1000000000) + 100000000),
         "TotalDataAvailable":dl-Math.floor((Math.random() * 2000000000) + 1000000000),
         "TotalDiskCapacity" : dl,
         "TotalSystemAvailable" : 0,
         "brightnessLevel":brightnessLevel,
         "SSIDInfo":SSIDInfo,
         "TotalSystemCapacity" : Math.floor((Math.random() * 10000000000) + 5000000000),
         "BluetoothAddress":FK_BLUETOOTH_ADDR,
         "WifiAddressData":FK_WIFI_ADDR,
         "FK_IMEI": FK_IMEI,
         "FK_ECID": FK_ECID,
         "DeviceToken":random3g4g()+"="+DeviceToken.toLowerCase(),
         "Systemversion":Systemversion,
         "UA":UA,
         "Releasenumber":Releasenumber,
         "CPID":CPID,
         "CpuFreq":CpuFreq,
         "MemorySize":MemorySize,
         "ScreenHeight":ScreenHeight,
         "ScreenWidth":ScreenWidth,
         "ResolutionHeight":ResolutionHeight,
         "ResolutionWidth":ResolutionWidth,
         "Timezone":{
           "Myip:":ip,
           "city":city,
           "country":country,
           "MobileSubscriberCountryCode":MobileSubscriberCountryCode,
           "MobileSubscriberNetworkCode":MobileSubscriberNetworkCode,
           "Network":Network,
           "countryCode":countryCode,
           "language":lang,
           "iso639":iso639,
           "isp":isp,
           "lat":lat,
           "lon":lon,
           "org":org,
           "region":region,
           "regionName":regionName,
           "offset":offset,
           "proxy":proxy,
           "timezoneb":timezoneb,
           "zip":zip
         }
        });
     }
    
     res.status(200).send(data);
  };
  //UPDATE `language` SET `language`='thangdeptrai',`geo`='thangdeptrai' WHERE `id`=43
  exports.update = async(req, res) => {
    const [results,metadata] = await db.sequelize.query('UPDATE `language` SET `language`=\'thangdeptrai5\',`geo`=\'thangdeptrai5\' WHERE `id`=43');
     res.status(200).send(results);
  };
  //INSERT INTO `language`(`id`, `language`, `geo`) VALUES (45,/'t1/',/'t2/')
  exports.insert=async(req, res) => {
   await db.sequelize.query('INSERT INTO `language`(`id`, `language`, `geo`) VALUES (48,\'t1\',\'t2\')',
    { type: Sequelize.QueryTypes.INSERT }).then(function(results){
      res.status(200).send(results);
    });
  };
  // lam delete
  