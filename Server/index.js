const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

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

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
