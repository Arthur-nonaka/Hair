/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("notes", (table) => {
    table.increments("id").primary();
    table.integer("client_id").unsigned().notNullable();
    table.text("content").notNullable();

    table
      .foreign("client_id")
      .references("id")
      .inTable("clients")
      .onDelete("CASCADE");

    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("notes");
};
