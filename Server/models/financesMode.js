const knex = require("knex");
const knexConfig = require("../knexfile");

const db = knex(knexConfig.development);
const TABLE = "finances";

async function findAll() {
  return db(TABLE).select("*").orderBy("id", "desc");
}

async function findById(id) {
  return db(TABLE).where({ id }).first();
}

async function findByFilter(filter = {}) {
  const query = db(TABLE).select("*").orderBy("id", "desc");

  if (filter.is_paid !== undefined) {
    query.where("is_paid", filter.is_paid);
  }

  if (filter.description && filter.description.trim() !== "") {
    query.where("description", "like", `%${filter.description.trim()}%`);
  }

  if (filter.min_amount) {
    query.where("amount", ">=", filter.min_amount);
  }

  if (filter.max_amount) {
    query.where("amount", "<=", filter.max_amount);
  }

  return query;
}

async function create(financeData) {
  const [newId] = await db(TABLE).insert(financeData);
  return findById(newId);
}

async function update(id, financeData) {
  const updatedRows = await db(TABLE).where({ id }).update(financeData);

  if (!updatedRows) {
    return null;
  }

  return findById(id);
}

async function remove(id) {
  return db(TABLE).where({ id }).del();
}

module.exports = {
  findAll,
  findById,
  findByFilter,
  create,
  update,
  remove,
};
