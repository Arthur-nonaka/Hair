/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("finances").del();
  await knex("finances").insert([
    {
      id: 1,
      amount: 150.0,
      is_paid: true,
      type: "income",
      description: "Corte e Hidratação - Maria Silva",
      created_at: new Date("2026-04-20"),
      updated_at: new Date("2026-04-20"),
    },
    {
      id: 2,
      amount: 200.0,
      is_paid: true,
      type: "income",
      description: "Alisamento - João Santos",
      created_at: new Date("2026-04-21"),
      updated_at: new Date("2026-04-21"),
    },
    {
      id: 3,
      amount: 120.0,
      is_paid: false,
      type: "income",
      description: "Coloração - Ana Costa",
      created_at: new Date("2026-04-22"),
      updated_at: new Date("2026-04-22"),
    },
    {
      id: 4,
      amount: 250.0,
      is_paid: true,
      type: "expense",
      description: "Compra de xampus e condicionadores",
      created_at: new Date("2026-04-18"),
      updated_at: new Date("2026-04-18"),
    },
    {
      id: 5,
      amount: 85.0,
      is_paid: true,
      type: "expense",
      description: "Aluguel - Parte do mês",
      created_at: new Date("2026-04-15"),
      updated_at: new Date("2026-04-15"),
    },
    {
      id: 6,
      amount: 350.0,
      is_paid: false,
      type: "income",
      description: "Progressiva - Pedro Oliveira",
      created_at: new Date("2026-04-23"),
      updated_at: new Date("2026-04-23"),
    },
    {
      id: 7,
      amount: 45.0,
      is_paid: true,
      type: "expense",
      description: "Energia elétrica",
      created_at: new Date("2026-04-19"),
      updated_at: new Date("2026-04-19"),
    },
    {
      id: 8,
      amount: 180.0,
      is_paid: true,
      type: "income",
      description: "Escova progressiva - Juliana Ferreira",
      created_at: new Date("2026-04-24"),
      updated_at: new Date("2026-04-24"),
    },
  ]);
};
