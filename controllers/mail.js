const db = require("../models");
const Sequelize = require("sequelize");
const http = require('http');
const http1 = require('https');
var Imap = require('imap');
var imap = new Imap({
  user: 'owcasvarexv@hotmail.com', // put your mail email
  password: '7e32KJ02', // put your mail password or your mail app password
  host: 'imap-mail.outlook.com', // put your mail host
  port: 993, // your mail host port
  tls: true 
})
function openInbox(cb) {imap.openBox('INBOX', true, cb);}
  imap.once('ready', function() {
      openInbox(function(err, box) { // call function to select the mailbox inbox to fetch new emails from inbox 
         var f = imap.seq.fetch('1:3', {
                   bodies: 'HEADER.FIELDS (FROM TO SUBJECT DATE)',
                   struct: true
                 });
  
         f.on('message', function(msg, seqno) {
            console.log(msg);
         })
  
         f.once('error', function(err) {
           console.log('Fetch error: ' + err);
         });
  
         f.once('end', function() {
           console.log('Done fetching all messages!');
           imap.end();
        });
      })})