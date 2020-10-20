var jwt = require("jsonwebtoken");
var token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjAyODc3NzY2LCJleHAiOjE2MDU0Njk3NjZ9.WjN0vQ_HoxCe1JZp2Ln--l_0wrON4Sk11hmX0Sa-UJE';
var decoded = jwt.decode(token);

// get the decoded payload and header
var decoded = jwt.decode(token, {complete: true});
console.log(decoded.header);
console.log(decoded.payload)