// 引入express第三方模块
const express = require('express');
// console.log(express);
// 引入路由器
const userRouter = require('./router/user.js');
// 引入body-parser中间件模块
const bodyParser = require('body-parser');
// 创建WEB服务器
const app = express();
// 设置端口
app.listen(8080);

//引入跨域管理模块
const cors = require("cors");
//配置允许跨域程序
app.use(cors({
	 origin:["http://127.0.0.1:8080","http://localhost:8080"]
}))

// 托管静态资源到public目录
app.use( express.static('./public') );

// 使用body-parser中间件将post请求的数据解析为对象
app.use(bodyParser.urlencoded({
    extended: false
}));

// 引入session对象
const session = require("express-session");
app.use(session({
    name: 'session-id',
    secret: '12345-67890',
    saveUninitialized: true,
    resave: false
}));


// 挂载路由器到WEB服务器下，添加前缀'/users'  写在最后
app.use('/users', userRouter);

// 错误处理中间件
// 拦截所有产生的错误
app.use((err, req, res, next) => {
    // err拦截到的错误
    console.log(err);
    res.send({ code: 500, msg: '服务器端错误' });
})