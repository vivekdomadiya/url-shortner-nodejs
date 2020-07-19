const path = require("path");
const express = require("express");
require("./db");
const urlRouter = require("./url-router");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json());
app.use(urlRouter);

app.listen(PORT, () => {
  console.log("app is running");
});
