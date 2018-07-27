/**
 * @author : by lxs
 * @date : 2018/7/24.
 * @description : 功能描述
 * @param {object} 参数名.
 * @return {text} 返回值.
 */
const path = require("path");
const configs = require('./config');
const routers = require('./routers');
const express = require("express");
const bodyparser = require("body-parser");
const session = require("express-session");
const handlebars = require("express-handlebars");

const app = express();
console.log(configs)
console.log(configs.compression)
// 代码压缩返回
app.use(configs.compression)

// 静态文件并且设置缓存
// app.use(express.static(path.join(__dirname,'statics')));
app.use(express.static(path.join(__dirname,'statics'),{
    //分布式系统尽量关闭掉Etag(每台机器生成的etag都会不一样)
    etag:true,
    maxAge:1000 * 60 * 60 * 24 * 30
}));


//服务器正常运行的情况下所有日志
app.use(configs.successLogger);

var sessionParser = session({
    secret: ['express','server','secret'],
    saveUninitialized: false,
    cookie:{
        maxAge: 1000 * 60 * 60 * 24 * 30
    }
});
app.use(sessionParser);





app.use(bodyparser.urlencoded({extended:false}));

// 页面驱动
app.engine('html', handlebars({
    extname:'.html',
    partialsDir:'views/comman/',
    layoutsDir:'views/',
    defaultLayout: 'layouts/layout'
}));
app.set('view engine', 'html');

// 路由
routers(app);

//服务器故障的情况下所有日志
app.use(configs.errorLogger);

app.listen(9011,function (err) {
    if(err){
        console.log("出错了！",err)
    }else{
        console.log("打开链接地址：http://localhost:9011/")
    }
})