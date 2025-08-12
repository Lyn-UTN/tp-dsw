create database if not exists tp_dsw;

create user if not exists 'tp_dsw_user'@'localhost' identified by 'tp_dsw_password';
grant all on tp_dsw.* to 'tp_dsw_user'@'localhost';