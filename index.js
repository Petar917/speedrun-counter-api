const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Ordner für Runs
const RUNS_DIR = path.join(__dirname, "runs");
if (!fs.existsSync(RUNS_DIR)) {
  fs.mkdirSync(RUNS_DIR);
}

// Root-Test
app.get("/", (req, res) => {
  res.send("Speedrun Counter API OK");
});

// Ping-Test
app.get("/ping", (req, res) => {
  res.json({ ok: true, message: "pong" });
});

// Submit (POST)
app.post("/submit", (req, res) => {
  const data = req.body;

  if (!data || Object.keys(data).length === 0) {
    return res.status(400).json({ ok: false, error: "Empty body" });
  }

  const filename = `run_${Date.now()}.json`;
  const filepath = path.join(RUNS_DIR, filename);

  fs.writeFileSync(filepath, JSON.stringify(data, null, 2));

  res.json({ ok: true, saved: filename });
});

// Runs anzeigen (GET)
app.get("/runs/full", (req, res) => {
  const files = fs.readdirSync(RUNS_DIR);

  const runs = files.map((file) => {
    const content = fs.readFileSync(path.join(RUNS_DIR, file), "utf-8");
    const data = JSON.parse(content);
    return data;
  });

  res.json(runs);
});


