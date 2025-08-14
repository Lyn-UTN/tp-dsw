create database if not exist membyDB; /* se crea la base de datos membyDB */

create user if not exists dsw@'%' identified by 'dsw'; /* el usuario es dsw y la password es dsw */
grant all on membyDB.* to dsw@'%'; /* se le otorgan todos los permisos al usuario dsw */

/* falta ver persistencia de datos */