const db = require("../models");
const Sequelize = require("sequelize");
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
                "mod":username,
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
        mang.push(element["userkey"]+":"+element["thongtin"]+":"+element["apikey"]);
    });
    res.status(200).send(mang);
}

exports.postSetting = async (req, res) => {
    let mod=req.body.mod;
    let serial = req.body.serial;
    let proxy = req.body.proxy;
    let setting = req.body.setting;
    let ip_device=req.body.ip_device;
    let offer=req.body.offer;
    let ssh = req.body.ssh;
    let vip72 = req.body.vip72;
    let note = req.body.note;
    let micro = req.body.micro;
    const result = await db.sequelize.query(
        "SELECT * FROM `serial` WHERE `serial`='"+serial+"' and `mod`='"+mod+"'",
        {
            nest: true,
            type: Sequelize.SELECT
        }
    );
    try{
        var ip=result[0]['ip_device'];
        res.status(204).send("Error");
    }catch{
        var sql="INSERT INTO `serial` (`ip_device`, `serial`, `mod`, `offer`, `setting`, `proxy`, `ban`, `micro`, `modem_phone`, `ssh`, `vip72`, `note`) VALUES ('"+ip_device+"', '"+serial+"', '"+mod+"', '"+offer+"', '"+setting+"', '"+proxy+"', b'1', '"+micro+"', 'iphone 6s', '"+ssh+"', '"+vip72+"', '"+note+"');";
        await db.sequelize.query(sql,{ type: Sequelize.QueryTypes.INSERT }).then(function(results){
       res.status(200).send("Success");
         });
    }
   

       

   
}
exports.putsetting = async (req, res) => {
    let mod=req.body.mod;
    let serial = req.body.serial;
    let proxy = req.body.proxy;
    let setting = req.body.setting;
    let ip_device=req.body.ip_device;
    let offer=req.body.offer;
    let ssh = req.body.ssh;
    let vip72 = req.body.vip72;
    let note = req.body.note;
    let micro = req.body.micro;
    //  await db.sequelize.query(
    //     "UPDATE `serial` SET `note`='" + note + "',`ip_device`='" + ip_device + "',`setting`='" + setting + "',`offer`='" + offer + "',`proxy`='" + proxy + "',`micro`='" + micro + "',`ssh`='" + ssh + "',`vip72`='" + vip72 + "' WHERE `serial`='" + serial + "' and `ban`='1'",
    //     {
    //         nest: true,
    //         type: Sequelize.QueryTypes.update
    //     }
    // );
    await db.sequelize.query("UPDATE `serial` SET `note`='" + note + "',`mod`='" + mod + "',`ip_device`='" + ip_device + "',`setting`='" + setting + "',`offer`='" + offer + "',`proxy`='" + proxy + "',`micro`='" + micro + "',`ssh`='" + ssh + "',`vip72`='" + vip72 + "' WHERE `serial`='" + serial + "' and `ban`='1'")
    res.status(200).send("success");
}

exports.put_allSetting = async (req, res) => {
    let mod=req.body.mod;
    let serial = req.body.serial;
    

    const result_get_serial = await db.sequelize.query(
        "SELECT * FROM `serial` WHERE `serial`='"+serial+"' and `mod`='"+mod+"'",
        {
            nest: true,
            type: Sequelize.SELECT
        }
    );

    const result_get_list = await db.sequelize.query(
        "SELECT * FROM `serial` WHERE `mod`='"+mod+"'",
        {
            nest: true,
            type: Sequelize.SELECT
        }
    );
        var setting=result_get_serial[0]["setting"];
        var offer=result_get_serial[0]["offer"];
       result_get_list.forEach(element=>{
        await db.sequelize.query("UPDATE `serial` SET `setting`='" + setting + "',`offer`='" + offer + "' WHERE `serial`='" + element["serial"] + "' and `ban`='1'")
       });
     res.status(200).send("success");
}
