const knex = require("knex");
const knexConfig = require("../knexfile");

const db = knex(knexConfig.development);
const TABLE = "notes";

async function findAll() {
  return db(TABLE).select("*").orderBy("id", "desc");
}

async function findById(id) {
  return db(TABLE).where({ id }).first();
}

async function findByClientId(client_id) {
  return db(TABLE).where({ client_id }).orderBy("id", "desc");
}

async function findByFilter(filter = {}) {
  const query = db(TABLE).select("*").orderBy("id", "desc");

  if (filter.client_id) {
    query.where("client_id", filter.client_id);
  }

  if (filter.content && filter.content.trim() !== "") {
    query.where("content", "like", `%${filter.content.trim()}%`);
  }

  if (filter.start_date) {
    query.where("created_at", ">=", filter.start_date);
  }

  if (filter.end_date) {
    query.where("created_at", "<=", filter.end_date);
  }

  return query;
}

async function create(noteData) {
  const [newId] = await db(TABLE).insert(noteData);
  return findById(newId);
}

async function update(id, noteData) {
  const updatedRows = await db(TABLE).where({ id }).update(noteData);

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
  findByClientId,
  findByFilter,
  create,
  update,
  remove,
};
