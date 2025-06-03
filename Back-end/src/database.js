const { Pool } = require("pg");

const URL_PG = "postgresql://nicolly:05469@localhost:5432/ncdonalds";

const database = new Pool({
  connectionString: URL_PG,
});

module.exports = database;
