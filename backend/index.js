import express from "express";
import cors from "cors";
import fs from "fs-extra";

const app = express();
const PORT = 5000;
const DB_PATH = "./db.json";

app.use(cors());
app.use(express.json());

// Read all items
app.get("/items", async (req, res) => {
  const data = await fs.readJSON(DB_PATH);
  res.json(data);
});

// Add new item
app.post("/items", async (req, res) => {
  const items = await fs.readJSON(DB_PATH);
  items.push(req.body);
  await fs.writeJSON(DB_PATH, items);
  res.status(201).json({ message: "Item added" });
});

// Delete item
app.delete("/items/:id", async (req, res) => {
  let items = await fs.readJSON(DB_PATH);
  items = items.filter((i) => i.id !== req.params.id);
  await fs.writeJSON(DB_PATH, items);
  res.json({ message: "Item deleted" });
});

app.listen(PORT, () =>
  console.log(`Backend running at http://localhost:${PORT}`)
);
