const express = require("express");
const app = express();
const Port = 8000;
const bodyParser = require("body-parser");
const router = require("./src/routers/index");
const cors = require("cors");

require("../api/src/db/connect");

app.use(cors());
app.use(express.json()); // Add this line to parse the request body as JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", router);
app.use("/", (req, res) => {
  res.send("Hello user");
});

app.listen(Port, () => {
  console.log(`Backend Server is running at ${Port}`);
});
