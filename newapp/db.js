const {Pool} = require("pg");

const pool = new Pool({
    user:PGUSER,
    password:PGPASSWORD,
    host:PGHOST,
    port:PGPORT,
    database:PGDATABASE,
})

module.exports= pool;

