let db = require("../models/db");

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
//添加场馆功能
exports.insert = (req,res)=>{
    req.header("Access-Control-Allow-Origin","*");
    MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
        if (err) throw err;
        var dbo = db.db("stadium");
        var whereStr = {"name": req.body.name};
        dbo.collection("stadiums").find(whereStr).toArray(function(err, result) {
            if (err) throw err;
            if(result.length>0){
                res.json({code:400,msg:"球馆已存在"});
                db.close();
            }else{
                dbo.collection("stadiums").insertOne(req.body, function (err, _res) {
                    if (err) throw err;
                    dbo.collection("booking").insertOne({name:req.body.name}, function (err, _res) {
                        if (err) throw err;
                        var updateStr = {$set: { "imgrul" : "public/images/indexstadium.jpg" }};
                        dbo.collection("stadiums").updateOne(req.body, updateStr, function(err, _res) {
                            if (err) throw err;
                            res.json({code: 200, msg: '添加成功'});
                            db.close();
                        });
                    });
                });
            }
        });
    })
};
//修改场馆功能
exports.updata = (req,res)=>{
    req.header("Access-Control-Allow-Origin","*");
    MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
        if (err) throw err;
        var dbo = db.db("stadium");
        var whereStr = {"name": req.body.oldname};
        var updataStr = {$set: {"name" : req.body.newname,"soccer7":req.body.soccer7,"soccer5":req.body.soccer5,"lighting":req.body.lighting,"grass":req.body.grass,"video":req.body.video,"medical":req.body.medical,"park":req.body.park,"address":req.body.address,"restroom":req.body.restroom}};
        dbo.collection("stadiums").updateOne(whereStr,updataStr, function (err, _res) {
            if (err) throw err;
            res.json({code: 200, msg: '更新成功'});
            db.close();
        });
    })
};
//得到场馆信息
exports.getstadiumInfo = (req,res)=>{
    db.getstadiumInfo(function (arr) {
        res.render("stadiumInfo",{"arr":arr,name:req.session.userId});
    })
};
//得到场馆预订信息以及场馆信息
exports.showplaygrounds = (req,res)=>{
    MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
        if (err) throw err;
        var dbo = db.db("stadium");
        dbo.collection("stadiums").find(req.query).toArray(function(err, result) {
            dbo.collection("booking").find(req.query).toArray(function(err, data) {
                res.render("playgrounds",{info:result[0],book:data[0]});
                db.close();
            });
        });
    })
};
//预订场馆
exports.subscribe = (req,res)=>{
    req.header("Access-Control-Allow-Origin","*");
    MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
        if (err) throw err;
        var dbo = db.db("stadium");
        dbo.collection("booking").find({name:req.body.name}).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            if(result.length>0) {
                switch (req.body.week){
                    case "monday":
                        dbo.collection("booking").updateOne({name:req.body.name}, {$set: {"monday" :"1"}}, function(err, _res) {
                        if (err) throw err;
                        res.json({code:200, msg:"恭喜您预订成功"});
                        db.close();
                    });break;
                    case "tuesday":
                        dbo.collection("booking").updateOne({name:req.body.name}, {$set: {"tuesday" :"1"}}, function(err, _res) {
                            if (err) throw err;
                            res.json({code:200, msg:"恭喜您预订成功"});
                            db.close();
                        });break;
                    case "wednesday":
                        dbo.collection("booking").updateOne({name:req.body.name}, {$set: {"wednesday" :"1"}}, function(err, _res) {
                            if (err) throw err;
                            res.json({code:200, msg:"恭喜您预订成功"});
                            db.close();
                        });break;
                    case "thursday":
                        dbo.collection("booking").updateOne({name:req.body.name}, {$set: {"thursday" :"1"}}, function(err, _res) {
                            if (err) throw err;
                            res.json({code:200, msg:"恭喜您预订成功"});
                            db.close();
                        });break;
                    case "friday":
                        dbo.collection("booking").updateOne({name:req.body.name}, {$set: {"friday" :"1"}}, function(err, _res) {
                            if (err) throw err;
                            res.json({code:200, msg:"恭喜您预订成功"});
                            db.close();
                        });break;
                    case "saturday":
                        dbo.collection("booking").updateOne({name:req.body.name}, {$set: {"saturday" :"1"}}, function(err, _res) {
                            if (err) throw err;
                            res.json({code:200, msg:"恭喜您预订成功"});
                            db.close();
                        });break;
                    case "sunday":
                        dbo.collection("booking").updateOne({name:req.body.name}, {$set: {"sunday" :"1"}}, function(err, _res) {
                            if (err) throw err;
                            res.json({code:200, msg:"恭喜您预订成功"});
                            db.close();
                        });break;
                }
            }else {
                res.json({code:400,msg:"很遗憾预订失败"});
                db.close();
            }
        });
    })
};
//退订场馆
exports.unsubscribe = (req,res)=>{
    req.header("Access-Control-Allow-Origin","*");
    MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
        if (err) throw err;
        var dbo = db.db("stadium");
        dbo.collection("booking").find({name:req.body.name}).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            if(result.length>0) {
                switch (req.body.week){
                    case "monday":
                        dbo.collection("booking").updateOne({name:req.body.name}, {$set: {"monday" :"0"}}, function(err, _res) {
                            if (err) throw err;
                            res.json({code:200, msg:"成功取消预订"});
                            db.close();
                        });break;
                    case "tuesday":
                        dbo.collection("booking").updateOne({name:req.body.name}, {$set: {"tuesday" :"0"}}, function(err, _res) {
                            if (err) throw err;
                            res.json({code:200, msg:"成功取消预订"});
                            db.close();
                        });break;
                    case "wednesday":
                        dbo.collection("booking").updateOne({name:req.body.name}, {$set: {"wednesday" :"0"}}, function(err, _res) {
                            if (err) throw err;
                            res.json({code:200, msg:"成功取消预订"});
                            db.close();
                        });break;
                    case "thursday":
                        dbo.collection("booking").updateOne({name:req.body.name}, {$set: {"thursday" :"0"}}, function(err, _res) {
                            if (err) throw err;
                            res.json({code:200, msg:"成功取消预订"});
                            db.close();
                        });break;
                    case "friday":
                        dbo.collection("booking").updateOne({name:req.body.name}, {$set: {"friday" :"0"}}, function(err, _res) {
                            if (err) throw err;
                            res.json({code:200, msg:"成功取消预订"});
                            db.close();
                        });break;
                    case "saturday":
                        dbo.collection("booking").updateOne({name:req.body.name}, {$set: {"saturday" :"0"}}, function(err, _res) {
                            if (err) throw err;
                            res.json({code:200, msg:"成功取消预订"});
                            db.close();
                        });break;
                    case "sunday":
                        dbo.collection("booking").updateOne({name:req.body.name}, {$set: {"sunday" :"0"}}, function(err, _res) {
                            if (err) throw err;
                            res.json({code:200, msg:"成功取消预订"});
                            db.close();
                        });break;
                }
            }else {
                res.json({code:400,msg:"取消预订失败"});
                db.close();
            }
        });
    })
};
//修改场馆页面
exports.updataStadium = (req,res) =>{
    db.getstadiumInfo(function (arr) {
        res.render("stadium_manage_delete",{"arr":arr});
    })
};
//获得单个场馆信息
exports.getone = (req,res) =>{
    db.getone(req.query,function(arr){
        res.json({
            code:200,
            name:arr[0].name,
            address:arr[0].address,
            soccer7:arr[0].soccer7,
            soccer5:arr[0].soccer5,
            lighting:arr[0].lighting,
            grass:arr[0].grass,
            video:arr[0].video,
            medical:arr[0].medical,
            park:arr[0].park,
            restroom:arr[0].restroom
        });

    })
};

//删除一个场馆
exports.deleteone = (req,res)=>{
    // db.deleteone(req.query,function(obj){
    //     res.json({code:200,msg:'删除成功'});
    // })
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("stadium");
        dbo.collection("booking").deleteOne(req.query, function(err, obj) {
            if (err) throw err;
            console.log("文档删除成功");
            dbo.collection("stadiums").deleteOne(req.query, function(err, obj) {
                if (err) throw err;
                console.log("文档删除成功");
                res.json({code:200,msg:"删除成功！"})
                db.close();
            });
        });
    });
};
//查询场馆功能
exports.search = (req,res)=>{
    MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
        if (err) throw err;
        var dbo = db.db("stadium");
        dbo.collection("stadiums").find(req.body).toArray(function(err, result) {
            if(result.length>0){
                res.json({
                    code:200,
                    msg:"查询成功"
                });
                db.close();
            }else{
                res.json({
                    code:400,
                    msg:"请输入正确的场馆名"
                });
                db.close();
            }
        });
    })
};