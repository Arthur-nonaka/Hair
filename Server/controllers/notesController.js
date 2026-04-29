const notesModel = require("../models/notesModel");

class NotesController {
  async getAll(req, res) {
    try {
      const filters = req.query;
      const result = await notesModel.findByFilter(filters);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const note = await notesModel.findById(id);
      res.status(200).json(note);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  async create(req, res) {
    try {
      const data = req.body;
      const created = await notesModel.create(data);
      res.status(201).json(created);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      await notesModel.update(id, data);
      res.status(200).json({ message: "Nota atualizada com sucesso" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      await notesModel.remove(id);
      res.status(200).json({ message: "Nota deletada com sucesso" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}

module.exports = new NotesController();
