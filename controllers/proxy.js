const db = require("../models");
const Sequelize = require("sequelize");
exports.getssh = async (req, res) => {
    let country=req.body.country;
    const ssh = await db.sequelize.query(
        "SELECT * FROM `svssh` WHERE `status`='live' AND country='" + country + "' ORDER BY rand() LIMIT 1",
        {
            nest: true,
            type: Sequelize.SELECT
        }
    );
    var ipssh=ssh[0]['ip'];
    var user=ssh[0]['user'];
    var pass=ssh[0]['pass'];
    var data=({
        "ip":ipssh,
        "user":user,
        "pass":pass
    });
    await sequelize.close();
    res.status(200).send(data);
};
//SELECT * FROM `svssh` WHERE `status`='live' AND country='' ORDER BY rand() LIMIT 1