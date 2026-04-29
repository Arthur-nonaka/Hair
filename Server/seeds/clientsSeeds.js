/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("clients").del();
  await knex("clients").insert([
    {
      id: 1,
      name: "Maria Silva",
      email: "maria.silva@email.com",
      phone: "(11) 98765-4321",
      address: "Rua A, 123 - São Paulo, SP",
    },
    {
      id: 2,
      name: "João Santos",
      email: "joao.santos@email.com",
      phone: "(11) 99876-5432",
      address: "Rua B, 456 - São Paulo, SP",
    },
    {
      id: 3,
      name: "Ana Costa",
      email: "ana.costa@email.com",
      phone: "(11) 97654-3210",
      address: "Rua C, 789 - São Paulo, SP",
    },
    {
      id: 4,
      name: "Pedro Oliveira",
      email: "pedro.oliveira@email.com",
      phone: "(11) 96543-2109",
      address: "Rua D, 321 - São Paulo, SP",
    },
    {
      id: 5,
      name: "Juliana Ferreira",
      email: "juliana.ferreira@email.com",
      phone: "(11) 95432-1098",
      address: "Rua E, 654 - São Paulo, SP",
    },
  ]);
};
