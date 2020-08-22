const {Pool} = require('pg')

const client = new Pool({
  database: 'postgres',
  server: 'localhost',
  user:"postgres",
  password:"1234",
  port:5432
})
module.exports =client