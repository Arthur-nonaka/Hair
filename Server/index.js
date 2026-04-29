const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

const { exec } = require("child_process");
const path = require("path");
require("dotenv").config();

app.use(cors());
app.use(express.json());

const clientController = require("./controllers/clientController");
const notesController = require("./controllers/notesController");
const financesController = require("./controllers/financesController");

//Client routes
app.get("/clients", clientController.getAll);
app.get("/clients/:id", clientController.getById);
app.post("/clients", clientController.create);
app.put("/clients/:id", clientController.update);
app.delete("/clients/:id", clientController.delete);

//Notes routes
app.get("/notes", notesController.getAll);
app.get("/notes/:id", notesController.getById);
app.post("/notes", notesController.create);
app.put("/notes/:id", notesController.update);
app.delete("/notes/:id", notesController.delete);

//Finances routes
app.get("/finances", financesController.getAll);
app.get("/finances/:id", financesController.getById);
app.post("/finances", financesController.create);
app.put("/finances/:id", financesController.update);
app.delete("/finances/:id", financesController.delete);

app.get("/backup", async (req, res) => {
  const { pathFile } = req.query;
  try {
    const filename = path.join(__dirname, pathFile || "backup.sql");
    const cmd = `mysqldump -h ${process.env.DB_HOST} -P ${process.env.DB_PORT} -u ${process.env.DB_USER} -p${process.env.DB_PASSWORD} ${process.env.DB_NAME} > "${filename}"`;
    exec(cmd, (error) => {
      if (error) {
        console.error("Erro ao criar backup:", error);
        return res.status(500).json({ error: "Erro ao criar backup" });
      }
      res.download(filename, "backup.sql", (err) => {
        if (err) {
          console.error("Erro ao enviar backup:", err);
          return res.status(500).json({ error: "Erro ao enviar backup" });
        }
      });
    });
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar backup" });
  }
});

app.get("/restore", async (req, res) => {
  const { pathFile } = req.query;
  try {
    const filename = path.join(__dirname, pathFile || "backup.sql");
    const cmd = `mysql -h ${process.env.DB_HOST} -P ${process.env.DB_PORT} -u ${process.env.DB_USER} -p${process.env.DB_PASSWORD} ${process.env.DB_NAME} < "${filename}"`;
    exec(cmd, (error) => {
      if (error) {
        console.error("Erro ao restaurar backup:", error);
        return res.status(500).json({ error: "Erro ao restaurar backup" });
      }
      res.json({ message: "Backup restaurado com sucesso" });
    });
  } catch (error) {
    res.status(500).json({ error: "Erro ao restaurar backup" });
  }
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
