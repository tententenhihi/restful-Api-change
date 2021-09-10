const db = require("../models");
const Sequelize = require("sequelize");
exports.loadsetting = async (req, res) => {
    let username = req.headers["username"];
    const setting = await db.sequelize.query(
        "SELECT * FROM `serial` JOIN `members` ON serial.mod=members.userName WHERE members.userName='" + username + "'",
        {
            nest: true,
            type: Sequelize.SELECT
        }
    );
    var array = [];
    setting.forEach(element => {
        var ban = element['ban'];
        var loadsetting = "";
        if (element["setting"] != "") {
            loadsetting = JSON.parse(element["setting"]);
        }

        var array_offer = [];
        if (element["offer"] != "[]") {
            var offer = element["offer"].split('@');
            offer.forEach(element => array_offer.push(JSON.parse(element)));
        }
        var serial = element["serial"];
        var device = element["modem_phone"];
        var note = element["note"];
        var stt=element["ID"];
        var ipadress=element["ip_device"];
        var version=element["version"];
        //var proxytool=element["proxy"];
        var data;
        if (ban[0]['ban'] != "0") {
            data = ({
                "STT":stt,
                "ipdevice":ipadress,
                "serial": serial,
                "version": version,
               // "proxytool":proxytool,
                "device": device,
                "note": note,
                "active": "yes",
                "mod": username,
                "offer": array_offer,
                "setting": loadsetting
               
            });
        } else {
            data = ({
                "serial": serial,
                "active": "no"
            })
        }
        array.push(data);
    });


    res.status(200).send(array);
};
exports.getmicro = async (req, res) => {
    //let userkey = req.headers["userkey"];
    const micro = await db.sequelize.query(
        "SELECT * FROM `micro`",
        {
            nest: true,
            type: Sequelize.SELECT
        }
    );
    var mang = [];
    micro.forEach(element => {
        mang.push(element["userkey"] + ":" + element["thongtin"] + ":" + element["apikey"]);
    });

    res.status(200).send(mang);
}
exports.putsetting = async (req, res) => {
    let mod = req.body.mod;
    let serial = req.body.serial;
    let setting = req.body.setting;
    if (setting == null) setting = "";
    let ip_device = req.body.ipdevice;
    let version = req.body.version;
    let offer = req.body.offer;
    // if(typeof(offer)=="string"){
    //     offer = Array.from(offer);

    // }

    console.log(offer);
    let of = "[]";
    if (offer != null)
        offer.forEach(element => {
            if (of == "[]") {
                of = JSON.stringify(element)
            } else {
                of = of + "@" + JSON.stringify(element);
            }
        });
    let note = req.body.note;
    await db.sequelize.query("SELECT * FROM `serial` WHERE `serial`='" + serial + "' and `mod`='" + mod + "'",
        {
            nest: true,
            type: Sequelize.SELECT
        }).then(async function (users) {
            if (users.length == 0) {
                var sql = "INSERT INTO `serial` (`ip_device`, `version`, `serial`, `mod`, `offer`, `setting`, `ban`, `modem_phone`, `note`) VALUES ('" + ip_device + "', '" + version + "', '"+ serial + "', '" + mod + "', '" + of + "', '" + JSON.stringify(setting) + "', b'1', 'iphone 6s','" + note + "');";
                await db.sequelize.query(sql, { type: Sequelize.QueryTypes.INSERT }).then(function (results) {
                    res.status(200).send("creat new success");
                });
            } else {
                await db.sequelize.query("UPDATE `serial` SET `note`='" + note + "',`mod`='" + mod + "',`version`='" +version+"',`ip_device`='" + ip_device + "',`setting`='" + JSON.stringify(setting) + "',`offer`='" + of + "' WHERE `serial`='" + serial + "' and `ban`='1'");
                res.status(200).send("edit success");
            }
        });



}

exports.put_allSetting = async (req, res) => {
    let mod = req.body.mod;
    let serial = req.body.serial;
    const result_get_serial = await db.sequelize.query(
        "SELECT * FROM `serial` WHERE `serial`='" + serial + "' and `mod`='" + mod + "'",
        {
            nest: true,
            type: Sequelize.SELECT
        }
    ).then(async function (users) {
        if (users.length != 0){
            const result_get_list = await db.sequelize.query(
                "SELECT * FROM `serial` WHERE `mod`='" + mod + "'",
                {
                    nest: true,
                    type: Sequelize.SELECT
                }
            );
            var setting = users[0]["setting"];
            var offer = users[0]["offer"];
            console.log(setting);
            result_get_list.forEach(async (element) => {
                var serialll = element["serial"];
                await db.sequelize.query("UPDATE `serial` SET `setting`='" + setting + "',`offer`='" + offer + "' WHERE `serial`='" + serialll + "' and `ban`='1' and `mod`='" + mod + "'");
            });
    
            res.status(200).send("success");
        }else{
            res.status(200).send("Error");
        }
       
    });


}
exports.delete_setting = async (req, res) => {
    let mod = req.body.mod;
    let serial = req.body.serial;
    var xoa = "DELETE FROM `serial` WHERE `serial`='" + serial + "' AND `mod`='" + mod + "'";
    await db.sequelize.query(xoa, { nest: true, type: Sequelize.QueryTypes.DELETE });
    res.status(200).send("success");

};