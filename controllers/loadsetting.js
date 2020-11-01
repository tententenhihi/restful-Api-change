const db = require("../models");
const Sequelize = require("sequelize");
const { micro } = require("./updatemicro");
const { and } = require("sequelize");
exports.loadsetting = async (req, res) => {
    let username = req.headers["username"];
    const setting = await db.sequelize.query(
        "SELECT *,REPLACE(`setting`,'\\r\\n','!!') FROM `serial` JOIN `members` ON serial.mod=members.userName WHERE members.userName='" + username + "'",
        {
            nest: true,
            type: Sequelize.SELECT
        }
    );
    console.log(setting[1]);
    var array=[];
    setting.forEach(element => {
        var ban = element['ban'];
        var loadsetting = element["REPLACE(`setting`,'\\r\\n','!!')"];
        var loadsetting1 = element["setting"];
        var ipdevice=element["ip_device"];
        var offer=element["offer"];
        var serial = element["serial"];
        var device = element["modem_phone"];
        var ssh = element["ssh"];
        var vip72 = element["vip72"];
        var micro = element["micro"]
        var proxy = element["proxy"];
        var note=element["note"];
        var data;
        if (ban[0]['ban'] != "0") {
            data = ({
                "ip":ipdevice,
                "device": device,
                "offer":offer,
                "serial": serial,
                "setting": loadsetting1,
                "proxy": proxy,
                "micro": micro,
                "ssh": ssh,
                "vip72": vip72,
                "note":note,
                "active": "yes"
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
exports.getmicro=async(req,res)=>{
    //let userkey = req.headers["userkey"];
    const micro = await db.sequelize.query(
        "SELECT * FROM `micro`",
        {
            nest: true,
            type: Sequelize.SELECT
        }
    );
    var mang=[];
    micro.forEach(element => {
        mang.push(element["userkey"]+":"+element["thongtin"]);
    });
    res.status(200).send(mang);
}
exports.putsetting = async (req, res) => {
    let serial = req.body.serial;
    let proxy = req.body.proxy;
    let setting = req.body.setting;
    let ip_device=req.body.ip_device;
    let offer=req.body.offer;
    let ssh = req.body.ssh;
    let vip72 = req.body.vip72;
    let note = req.body.note;
    let micro = req.body.micro;
    const [results, metadata] = await db.sequelize.query(
        "UPDATE `serial` SET `note`='" + note + "',`ip_device`='" + ip_device + "',`setting`='" + setting + "',`offer`='" + offer + "',`proxy`='" + proxy + "',`micro`='" + micro + "',`ssh`='" + ssh + "',`vip72`='" + vip72 + "' WHERE `serial`='" + serial + "' and `ban`='1'",
        {
            nest: true,
            type: Sequelize.QueryTypes.update
        }
    );
    res.status(200).send("success");
}
