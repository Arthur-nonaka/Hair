const knex = require("knex");
const knexConfig = require("../knexfile");

const db = knex(knexConfig.development);
const TABLE = "clients";

async function findAll() {
  return db(TABLE).select("*").orderBy("id", "desc");
}

async function findById(id) {
  return db(TABLE).where({ id }).first();
}

async function findByFilter(filter = {}) {
  const query = db(TABLE).select("*").orderBy("id", "desc");

  if (filter.name && filter.name.trim() !== "") {
    query.where("name", "like", `%${filter.name.trim()}%`);
  }
  if (filter.email && filter.email.trim() !== "") {
    query.where("email", "like", `%${filter.email.trim()}%`);
  }
  if (filter.phone && filter.phone.trim() !== "") {
    query.where("phone", "like", `%${filter.phone.trim()}%`);
  }
  if (filter.address && filter.address.trim() !== "") {
    query.where("address", "like", `%${filter.address.trim()}%`);
  }
  if (filter.start_date) {
    query.where("created_at", ">=", filter.start_date);
  }
  if (filter.end_date) {
    query.where("created_at", "<=", filter.end_date);
  }

  return query;
}

async function create(clientData) {
  const [newId] = await db(TABLE).insert(clientData);
  return findById(newId);
}

async function update(id, clientData) {
  const updatedRows = await db(TABLE).where({ id }).update(clientData);

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
