const financesModel = require("../Models/financesModel");

class FinancesController {
  async getAll(req, res) {
    try {
      const filters = req.query;
      const result = await financesModel.findByFilter(filters);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const note = await financesModel.findById(id);
      res.status(200).json(note);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  async create(req, res) {
    try {
      const data = req.body;
      const created = await financesModel.create(data);
      res.status(201).json(created);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      await financesModel.update(id, data);
      res.status(200).json({ message: "Finança atualizada com sucesso" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      await financesModel.remove(id);
      res.status(200).json({ message: "Finança deletada com sucesso" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}

module.exports = new FinancesController();
