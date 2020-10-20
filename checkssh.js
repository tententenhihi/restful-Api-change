const http = require('http');

const { Client, HTTPAgent, HTTPSAgent } = require('ssh2');

const sshConfig = {
  host: '192.168.100.1',
  port: 22,
  username: 'nodejs',
  password: 'rules'
};
const conn = new Client();
function checkssh(callback) {
  conn.on('ready', () => {
    //console.log('Client :: ready');
   return callback('Client :: ready');
    //conn.end();
  }).on('error', (err) => {
    //  console.log("SSH DIE");
   return callback('SSH DIE');
    // conn.end();
  }).connect(sshConfig);
}

var kq = checkssh(function(arg){return arg});
console.log(kq);