const clientModel = require("../models/clientModel");

class ClientController {
  async getAll(req, res) {
    try {
      const filters = req.query;
      const result = await clientModel.findByFilter(filters);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const client = await clientModel.findById(id);
      res.status(200).json(client);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  async create(req, res) {
    try {
      const data = req.body;
      const created = await clientModel.create(data);
      res.status(201).json(created);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      await clientModel.update(id, data);
      res.status(200).json({ message: "Cliente atualizado com sucesso" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      await clientModel.remove(id);
      res.status(200).json({ message: "Cliente deletado com sucesso" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}

module.exports = new ClientController();
