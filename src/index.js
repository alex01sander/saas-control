const express = require("express");
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "SaaS Control API is running!" });
});

app.listen(3000, () =>
  console.log(
    "🔥 Server started at [http://localhost:3000](http://localhost:3000/)",
  ),
);
