/* 设置客户端连接服务器端的编码 */
set names utf8;
/* 丢弃数据库，如果存在的话 */
drop database if exists huawei;
/* 创建新的数据库,设置存储的编码 */
create database huawei charset=utf8;
/* 进入数据库 */
use huawei;
/* 创建用户表 */
create table user(
    uid int primary key auto_increment,
    uname varchar(9) unique not null,
    phone char(11) unique,
    email varchar(32) unique,
    upwd varchar(8) not null
);