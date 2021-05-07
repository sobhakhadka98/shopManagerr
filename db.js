const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "Sobha27",
    database: "shopmanager",
    host: "localhost",
    port: 5432
});

module.exports = pool;