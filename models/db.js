var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
// 查询所有场馆信息
function getstadiumInfo(callback) {
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("stadium");
        dbo.collection("stadiums"). find({}).toArray(function(err, result) { // 返回集合中所有数据
            if (err) throw err;
            callback(result);
            db.close();
        });
    });
}
//根据场馆名字查询一个场馆信息
function getone(name,callback) {
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("stadium");
        dbo.collection("stadiums"). find(name).toArray(function(err, result) { // 返回集合中所有数据
            if (err) throw err;
            callback(result);
            db.close();
        });
    });
}
//根据场馆名删除一个场馆
function deleteone(name,callback){
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("stadiums");
        dbo.collection("stadiums").deleteOne(name, function(err, obj) {
            if (err) throw err;
            dbo.collection("booking").deleteOne(name, function(err, obj) {
                if (err) throw err;
                db.close();
                callback(obj);
            });
        });
    });
}
exports.getstadiumInfo = getstadiumInfo;
exports.getone = getone;
exports.deleteone = deleteone;
//删除user
// function deleteuser() {
//     MongoClient.connect(url,{useNewUrlParser: true},function (err,db) {
//         if (err) throw err;
//         var dbo = db.db("stadium");
//         //删除
//         var deleteuser = {"userId":'aaa'};  // 查询条件
//         dbo.collection("users").deleteOne(deleteuser, function(err, obj) {
//             if (err) throw err;
//             console.log("文档删除成功");
//             db.close();
//         });
//     })
// }


// MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("stadium");
//     var whereStr = {"name":'河南科技大学'};  // 查询条件
//     dbo.collection("booking").deleteOne(whereStr, function(err, obj) {
//         if (err) throw err;
//         console.log("文档删除成功");
//         db.close();
//     });
// });
// //插入user
// function insertuser(username,password) {
//     MongoClient.connect(url,{useNewUrlParser: true},function (err,db) {
//         if (err) throw err;
//         var dbo = db.db("stadium");
//         // 插入
//         var newuser = {userId: username,password: password};
//         dbo.collection("users").insertOne(newuser, function(err, res) {
//             if (err) throw err;
//             console.log("文档插入成功");
//             db.close();
//         });
//     })
// }
//
// //更新user
// function updateuser() {
//     MongoClient.connect(url,{useNewUrlParser: true},function (err,db) {
//         if (err) throw err;
//         var dbo = db.db("stadium");
//         //更新
//         var updatauser = {"userId":'zhangsan'};  // 查询条件
//         var updatepassword = {$set: { "passWord" : "ZS1234" }};
//         dbo.collection("users").updateOne(updatauser, updatepassword, function(err, res) {
//             if (err) throw err;
//             console.log("文档更新成功");
//             db.close();
//         });
//     })
// }
//
// exports.getusers = getusers();
// exports.deleteuser = deleteuser();
// exports.updateuser = updateuser();
// exports.insertuser = insertuser();