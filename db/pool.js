const Pool = require('pg').Pool;

const pool = new Pool({
  user: "postgres",
  host: "containers-us-west-54.railway.app",
  password:'VeBQ97WflQPRD6DlsNdc',
  database: "airplanes",
  port: 5457
})       

module.exports = () => pool;