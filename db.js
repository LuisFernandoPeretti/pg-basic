const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "Info@1234",
    database: "pgregister",
    host: "localhost",
    port: 5432
});

module.exports = pool;