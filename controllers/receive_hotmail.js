var imaps = require('imap-simple');
const simpleParser = require('mailparser').simpleParser;
const _ = require('lodash');

exports.hotmail = async (req, res) => {
    let user = req.body.user;
    let pass = req.body.pass;
    let phanloai = req.body.map;//gmail,hotmail
    let sub = req.body.sub;
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
                           // console.log(mail.subject);
                            
                            if (!mail.from.value[0]['address'].includes('microsoft')) {
                                if(mail.subject!==undefined){
                                    if (sub != null) {
                                        // console.log(mail.from.value[0]['address']);
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
                               
                                if(content!=null)
                                Array.push(content);
                               
                                
                            }
                           // console.log(doneCount);
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


};
