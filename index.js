const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Speedrun Counter API OK");
});

app.post("/submit", (req, res) => {
  console.log("DATA:", req.body);
  res.json({ ok: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
