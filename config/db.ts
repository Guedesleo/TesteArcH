const sql = require('mssql')

const config = {
  database: 'SecuritySolution',
  server: 'localhost',
  user:"sa",
  password:"Fermath$",
  port:1433,
  options: {
    trustedConnection: true,
    "encrypt": true,
    "enableArithAbort": true
  }
}

const pool = new sql.ConnectionPool(config).connect()

module.exports = { pool}