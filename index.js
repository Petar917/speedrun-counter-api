const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// JSON Body erlauben
app.use(express.json());

// Speicherordner
const RUNS_DIR = path.join(__dirname, "runs");
if (!fs.existsSync(RUNS_DIR)) {
  fs.mkdirSync(RUNS_DIR);
}

// Root – Test
app.get("/", (req, res) => {
  res.send("Speedrun Counter API OK");
});

// Ping – Debug
app.get("/ping", (req, res) => {
  res.json({ ok: true, message: "pong" });
});

// Submit Run – DAS ist die wichtige Route
app.post("/submit", (req, res) => {
  const data = req.body;

  if (!data || Object.keys(data).length === 0) {
    return res.status(400).json({ ok: false, error: "Empty body" });
  }

  const filename = `run_${Date.now()}.json`;
  const filepath = path.join(RUNS_DIR, filename);

  fs.writeFileSync(filepath, JSON.stringify(data, null, 2));

  res.json({
    ok: true,
    saved: filename
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

