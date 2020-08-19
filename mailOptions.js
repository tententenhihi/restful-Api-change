var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'anchomapzo@gmail.com',
      pass: 'QA123123a'
    }
  });
  var mailErrorIP = {
    from: 'anchomapzo@gmail.com',
    to: 'lck93802@gmail.com',
    subject: 'Báo Cáo Lỗi KingLead',
    text: 'Lỗi Get IP'
  };
  var mailFakeInfo = {
    from: 'anchomapzo@gmail.com',
    to: 'lck93802@gmail.com',
    subject: 'Báo Cáo Lỗi KingLead',
    text: 'Lỗi Fake INFO'
  };
  var hetolddevice = {
    from: 'anchomapzo@gmail.com',
    to: 'lck93802@gmail.com',
    subject: 'Dac biet',
    text: 'Đã Hết Old Device Server cũ'
  };
const EmailerroIP= function(){
  transporter.sendMail(mailErrorIP, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  })
} ;
  const EmailerroFakeInfo= function(){ transporter.sendMail(mailFakeInfo, function(error, info){
    if (error) {
      console.log(error);
    } else {
     console.log('Email sent: ' + info.response);
    }
  });}
  const hetoldDV= function(){ transporter.sendMail(hetolddevice, function(error, info){
    if (error) {
      console.log(error);
    } else {
     console.log('Email sent: ' + info.response);
    }
  });}
module.exports.transporterIP=EmailerroIP;
module.exports.EmailerroerroFakeInfo=EmailerroFakeInfo;
module.exports.hetOlDevice=hetoldDV;

