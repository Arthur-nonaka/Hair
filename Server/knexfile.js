require("dotenv").config();

const config = {
  client: "mysql2",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  migrations: {
    directory: "./migrations",
    tableName: "knex_migrations",
  },
  seeds: {
    directory: "./seeds",
  },
};

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: config,
  production: config,
};
