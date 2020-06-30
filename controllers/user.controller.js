const db = require("../models");
const Sequelize = require("sequelize");
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
  exports.SELECT = async(req, res) => {
    const User =await db.sequelize.query(
      'SELECT `HWMachine`,`HWModel`,`BDID`AS \'HWCount\',`CPID`,`CpuFreq`,Os.OSVersion,Os.utsname_Releasenumber,Os.utsname_Systemversion,Os.UserAgent,`MemorySize`,`ScreenHeight`,`ScreenWidth`,`ResolutionHeight`,`ResolutionWidth`,Os.Build FROM `Model` JOIN Os ORDER BY RAND() LIMIT 1',
      {
      nest: true,
       type:Sequelize.SELECT
      }
    );
     res.status(200).send(User);
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
  