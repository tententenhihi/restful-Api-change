const namedevice=function(){
    var s="";
    const fs=require("fs");
var noidung=fs.readFileSync(__dirname+"/namedevice.txt");
var content=[];
content=noidung.toString().split('\n');
return s=content[Math.floor(Math.random() * (content.length-1))].toString();
}
module.exports.namedevice=namedevice;