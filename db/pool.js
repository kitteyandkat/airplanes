const Pool = require('pg').Pool;
require('dotenv').config();

const pool = new Pool({
  // user: "postgres",
  // host: "containers-us-west-54.railway.app",
  // password:'VeBQ97WflQPRD6DlsNdc',
  // database: "airplanes",
  // port: 5457
  database: process.env.DATABASE_URL
})       

module.exports = () => pool;
// pool.query(`CREATE DATABASE airplanes`)