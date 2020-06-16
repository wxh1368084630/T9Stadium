var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

//注册
exports.register = (req,res)=>{
    req.header("Access-Control-Allow-Origin","*");
    MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
        if (err) throw err;
        var dbo = db.db("stadium");

        var whereStr = {"userId": req.body.userId};
        dbo.collection("users").find(whereStr).toArray(function(err, result) {
            if (err) throw err;
            if(result.length>0){
                res.json({code:400,msg:"用户名已存在"});
                db.close();
            }else{
                dbo.collection("users").insertOne(req.body, function (err, _res) {
                    if (err) throw err;
                    res.json({code: 200, msg: '注册成功'});
                    db.close();
                });
            }
        });
    })
};

//登录
exports.login = (req,res)=>{
    req.header("Access-Control-Allow-Origin","*");
    MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
        if (err) throw err;
        var dbo = db.db("stadium");
        //var user = req.body.userId + req.body.passWord;
        dbo.collection("users").find(req.body).toArray(function(err, result) {
            if (err) throw err;
            if(result.length>0){
                req.session.userId = result[0].userId;
                res.json({code:200,msg:"登录成功"});
                db.close();
            }else{
                res.json({code:400, msg: '用户名密码不一致'});
                db.close();
            }
        });
    })
};

//退出登录
exports.relogin = (req,res)=>{
    req.session.destroy((err)=>{
        if (err) throw err;
        res.redirect("/index");
    })
};

//修改密码
exports.doChangePwd = (req,res)=>{
    req.header("Access-Control-Allow-Origin","*");
    MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
        if (err) throw err;
        var dbo = db.db("stadium");

        dbo.collection("users").find({userId:req.body.userId,passWord:req.body.oldPwd}).toArray(function(err, result) {
            if (err) throw err;
            if(result.length>0) {
                dbo.collection("users").updateOne({userId:req.body.userId,passWord:req.body.oldPwd}, {$set: { "passWord":req.body.newPwd}}, function(err, _res) {
                    if (err) throw err;
                    res.json({code:200, msg:"修改成功"});
                    db.close();
                });
            }else {
                res.json({code:400,msg:"密码输入有误"});
                db.close();
            }
        });
    })
};