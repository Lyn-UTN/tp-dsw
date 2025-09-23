create database if not exists AIRBNG;

create user if not exists 'AIRBNG_user'@'localhost' identified by 'AIRBNG_password';
grant all on AIRBNG.* to 'AIRBNG_user'@'localhost';