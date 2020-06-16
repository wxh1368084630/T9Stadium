let express = require("express");
let app = express();
let regist = require("./controllers/regist");
var bodyParser = require('body-parser');
var cors = require("cors");
var proxy = require("http-proxy-middleware");
var session = require("express-session");
var jwt = require("jsonwebtoken");
let stadium = require("./controllers/stadium");
let mystadium = require("./controllers/mystadium");


//开启跨域，放在开启路由之前
app.use(cors());

//使用session
app.use(session({
    secret: 'recommend 128 bytes random string',
    cookie: { maxAge: 20 * 60 * 1000 },//存储时长20分钟
    resave: true,
    saveUnintialized: true
}))
//使用token

//代理服务器
//app.use("/",proxy({target:"",changeOrigin:true}));
//服务器端口号
app.listen(3000,(req,res)=>{
    console.log("服务器在3000端口启动了！");
})
// 配置body-parser通过req.body得到客户端传递过来的数据
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//托管静态资源
app.use('/public', express.static('public'));
app.set("view engine","ejs");

//登录页面
app.get("/index",(req,res)=>{
    res.render('index',{});
});

//注册页面
app.get("/regist",(req,res)=>{
    res.render('regist',{});
});
//主页面
// app.get("/stadiumInfo",(req,res)=>{
//     res.render('stadiumInfo',{ name:req.session.userId});
// });
//添加场馆页面
app.get("/insertstadium",(req,res)=>{
    res.render("insertstadium",{});
});
//我的信息页面
app.get("/mystadium",(req,res)=>{
    res.render("mystadium",{});
});
//T9简介页面
app.get("/aboutT9",(req,res)=>{
    res.render("aboutus",{});
});
//个人信息页面
app.get("/personInfo",(req,res)=>{
    res.render("personInfo");
});
//修改密码页面
app.get("/changePwd",(req,res)=>{
    res.render("changePwd",{name:req.session.userId});
});
//管理球场页面--添加
app.get("/stadium_manage_insert",(req,res)=>{
    res.render("stadium_manage_insert");
});
//管理球场页面--修改
app.get("/stadium_manage_delete",(req,res)=>{
    res.render("stadium_manage_delete");
});
//修改场馆页面
app.get("/updataStadium",stadium.updataStadium);
//查询场馆页面
app.get("/searchstadium",(req,res)=>{
    res.render("searchstadium");
});



//跳转场馆详情页面
app.get("/playgrounds",stadium.showplaygrounds);
//注册功能
app.post("/register",regist.register);
//登录功能
app.post("/login",regist.login);
//退出登录功能
app.get("/relogin",regist.relogin);
//获取关于T9Stadium的信息
app.get("/aboutus",mystadium.aboutus);
//获取球馆列表
app.get("/getstadiumInfo",stadium.getstadiumInfo);
//修改密码功能
app.post("/doChangePwd",regist.doChangePwd);
//添加场馆功能
app.post("/insertStadium",stadium.insert);
//修改场馆功能
app.post("/updata",stadium.updata);
//预订功能
app.post("/subscribe",stadium.subscribe);
//退订功能
app.post("/unsubscribe",stadium.unsubscribe);
//得到一个场馆功能
app.get("/getone",stadium.getone);
//删除一个场馆功能
app.get("/deleteone",stadium.deleteone);
//查询场馆功能
app.post("/search",stadium.search);

//获取放置在public文件夹下的静态文件,
// app.use(express.static(__dirname + '/public'));
