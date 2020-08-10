const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const db = require("../restful-Api/models");
const requestIp = require('request-ip');
// const Role = db.role;
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Db');
//   initial();
// });
// function initial() {
//   Role.create({
//     id: 1,
//     name: "user"
//   });
 
//   Role.create({
//     id: 2,
//     name: "moderator"
//   });
 
//   Role.create({
//     id: 3,
//     name: "admin"
//   });
// }
//db.sequelize.sync();
var corsOptions = {
    origin: "http://localhost:9999"
  };
  
  app.use(cors(corsOptions));
  app.use(requestIp.mw());

  // parse requests of content-type - application/json
  app.use(bodyParser.json());
  // parse requests of content-type - application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: true }));
  
  // simple route
  app.get("/", (req, res) => {
    res.json({ message: "Welcome to KingCorp." });
  });

  // routes
require('../restful-Api/routes/auth.routes')(app);
require('../restful-Api/routes/user.routes')(app);
  // set port, listen for requests
  const PORT = process.env.PORT || 9999;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });