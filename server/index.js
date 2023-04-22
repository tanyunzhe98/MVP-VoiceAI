const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const controller = require("./Controller.js");
const path = require("path");
const localcontroller = require("../database/controller/controllers.js")

const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
  secret: 'my-secret-key',
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
}));
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());
app.use((req, res, next) => {
  console.log('serving: ', req.method, req.path, req.query);
  next();
})
app.post("/text", (req, res) => {
  controller.submitText(req, res);
});

//create new user
app.post("/user", (req, res) => {
});

//register check user exist
app.get("/user", (req, res) => {

});

//login check user password correct
app.get("/users/login", (req, res) => {
  localcontroller.login(req,res)
});

//return user's chat history
app.get("/user/theme", (req, res) => {

})

//add theme
app.post("/user/theme", (req, res) => {

});

//add message
app.post("/user/theme/message", (req, res) => {

});

app.listen(PORT, () => {console.log(`Server is listening at http://localhost:${PORT}`);});
