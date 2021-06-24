// 路由器
// 引入express模块
const express = require('express');
// 引入连接池模块
const pool = require('../pool.js');
// 创建路由器对象
const r = express.Router();

// 添加路由
// 用户注册
// http://127.0.0.1:8080/users/reg
r.post('/reg', (req, res, next) => {
    // 1.获取post请求的数据
    let obj = req.body;
    console.log(obj);
    // 2.执行SQL命令，插入数据
    pool.query('insert into user set ?', [obj], (err, result) => {
        if (err) {
            next(err);
            return;
        }
        console.log(result);
        if (result.affectedRows > 0) {
            res.send("1");
        } else {
            res.send("0");
        }
    })
})


// 用户登录
// http://127.0.0.1:8080/users/login
r.post('/login', (req, res, next) => {
    // 1.获取post请求的数据
    let obj = req.body;
    console.log(obj);
    var sql = '';
    // 手机号登录
    if (obj.phone !== undefined) {
        sql = 'select * from user where phone=? and upwd=?';
        // 2.执行SQL命令，插入数据
        pool.query(sql, [obj.phone, obj.upwd], (err, result) => {
            if (err) {
                next(err);
                return;
            }
            console.log(result);
            console.log(result.length);
            if (result.length === 0) {
                res.send("0");
            } else {
                res.send("1");
            }
        })
        // 邮箱登录
    } else if (obj.email !== undefined) {
        sql = 'select * from user where email=? and upwd=?';
        pool.query(sql, [obj.email, obj.upwd], (err, result) => {
            if (err) {
                next(err);
                return;
            }
            console.log(result);
            if (result.length === 0) {
                res.send("0");
            } else {
                res.send("1");
            }
        })
    } else {
        sql = 'select * from user where uname=? and upwd=?';
        pool.query(sql, [obj.uname, obj.upwd], (err, result) => {
            if (err) {
                next(err);
                return;
            }
            console.log(result);
            if (result.length === 0) {
                res.send("0");
            } else {
                res.send("1");
            }
        })
    }


})

// 检测用户名、手机号、邮箱是否可用
// http://127.0.0.1:8080/users/isexists
r.get('/isexists', (req, res, next) => {
    let obj = req.query;
    console.log(obj);
    if (obj.uname !== undefined) {
        let sql = 'select uid from user where uname=?';
        // 执行SQL命令
        pool.query(sql, [obj.uname], (err, result) => {
            if (err) {
                next(err);
                ruturn;
            }
            console.log(result);
            if (result.length > 0) {
                // 说明查询到了
                res.send("1");
            } else {
                res.send("0");
            }
        })
    } else if (obj.phone !== undefined) {
        let sql = 'select uid from user where phone=?';
        // 执行SQL命令
        pool.query(sql, [obj.phone], (err, result) => {
            if (err) {
                next(err);
                ruturn;
            }
            console.log(result);
            if (result.length > 0) {
                // 说明查询到了
                res.send("1");
            } else {
                res.send("0");
            }
        })
    } else if (obj.email !== undefined) {
        let sql = 'select uid from user where email=?';
        // 执行SQL命令
        pool.query(sql, [obj.email], (err, result) => {
            if (err) {
                next(err);
                ruturn;
            }
            console.log(result);
            if (result.length > 0) {
                // 说明查询到了
                res.send("1");
            } else {
                res.send("0");
            }
        })
    }

})





// 导出路由器对象
module.exports = r;