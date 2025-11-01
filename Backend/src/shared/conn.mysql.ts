import mysql from "mysql2/promise";

export const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "aldao338",
  database: process.env.DB_NAME || "AIRBNG",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  maxIdle: 10,
  idleTimeout: 60000, // 60 seconds
  enableKeepAlive: true, //evita timeout desde el lado del servidor
  keepAliveInitialDelay: 0,
});
//creo q no es necesario tener este archivo en el proyecto, pero lo dejo por las dudas
