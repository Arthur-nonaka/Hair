/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("finances", (table) => {
    table.increments("id").primary();
    table.decimal("amount", 10, 2).notNullable();
    table.boolean("is_paid").nullable();
    table.text("description").nullable();

    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("finances");
};
