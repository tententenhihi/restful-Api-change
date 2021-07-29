var imaps = require('imap-simple');
const simpleParser = require('mailparser').simpleParser;
const _ = require('lodash');
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
  exports.buymail = async (req, res) =>{

    //http://api.maxclone.vn/api/portal/buyaccount?key=c009dcfd958d436ea89dcf278ad08392a7f0cc4467484399a11bf10863a114c5&type=HOTMAIL&quantity=1
    var options = {
        host: 'api.maxclone.vn',
        path: '/api/portal/buyaccount?key=c009dcfd958d436ea89dcf278ad08392a7f0cc4467484399a11bf10863a114c5&type=HOTMAIL&quantity=1',
      };
      (async () => {
        try {
          const data = await doRequest(options);
          if (data.Code == 0) {
            var data1 = data.Data
           res.status(200).send(data1[0].Username+"|"+data1[0].Password);
          }
    
        } catch (error) {
            res.status(200).send(error);
       }
    
      })();
}
exports.hotmail = async (req, res) => {
    try{
        var queryParameter=req.query;
        let user = queryParameter.user;
        let pass = queryParameter.pass;
        let sub=queryParameter.search;
       
     //   let phanloai = req.body.map;//gmail,hotmail
        let Array = [];
        var config = {
            imap: {
                user: user,
                password: pass,
                host: 'imap-mail.outlook.com',
                port: 993,
                tls: true,
                authTimeout: 3000
            }
        };
        
        imaps.connect(config).then(function (connection) {
                return connection.openBox('INBOX').then(function () {
                    var searchCriteria = ['1:10'];
                    var fetchOptions = {
                        bodies: ['HEADER', 'TEXT', ''],
                    };
                    return connection.search(searchCriteria, fetchOptions).then(function (messages) {
                        var doneCount=0;
                        for(var indexMessage=0; indexMessage<messages.length;indexMessage++)
                        {
                            var item = messages[indexMessage];
                            (function(item){
                                var all = _.find(item.parts, { "which": "" })
                                var id = item.attributes.uid;
                                var idHeader = "Imap-Id: " + id + "\r\n";
                                simpleParser(idHeader + all.body, (err, mail) => {
                                    if (!mail.from.value[0]['address'].includes('microsoft')) {
                                        if(mail.subject!==undefined){
                                            if (sub != null) {
                                                 if (mail.from.value[0]['address'].includes(sub)) {
                                                     var address = mail.from.value[0]['address'];
                                                     var name = mail.from.value[0]['name'];
                                                     var content = {
                                                         'from': address,
                                                         'name': name,
                                                         'subject': mail.subject,
                                                         'content': mail.text
                                                     }
                                                 }
                                             } else {
                                                 var address = mail.from.value[0]['address'];
                                                 var name = mail.from.value[0]['name'];
                                                 var content = {
                                                     'from': address,
                                                     'name': name,
                                                     'subject': mail.subject,
                                                     'content': mail.text
                                                 }
                                             }
                                        }else{
                                            var address = mail.from.value[0]['address'];
                                            var name = mail.from.value[0]['name'];
                                            var content = {
                                                'from': address,
                                                'name': name,
                                                'subject': "",
                                                'content': mail.text
                                            }
                                        }
                                       
                                        if(content!=null){
                                            Array.push(content);
                                        }
                                       
                                       
                                        
                                    }
                                    doneCount++;
                                    if(doneCount == messages.length)
                                    {
                                        res.status(200).send(Array);
                                    } 
        
                                });
                            })(item);
                            
                        }
                        
                        
                    });
                });
         
           
    
        });
    }catch{res.status(200).send("Error");}
   
  
    //buy_hotmail();
};
