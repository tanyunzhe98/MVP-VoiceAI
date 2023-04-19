const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const controller = require("./Controller.js");
const path = require("path");

const PORT = 3000;

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());
app.use((req, res, next) => {
  console.log('serving: ', req.method, req.path, req.query);
  next();
})
app.post("/text", (req, res) => {
  controller.submitText(req, res);
});

app.listen(PORT, () => {console.log(`Server is listening at http://localhost:${PORT}`);});
