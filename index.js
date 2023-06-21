const express = require("express");
const { register, login, getMe } = require("./controllers/UserController");

const {
  create,
  getAll,
  getOne,
  remove,
  update,
} = require("./controllers/PostController");

const mongoose = require("mongoose");

const {
  registerValidator,
  loginValidator,
  postCreatedValidation,
} = require("./validations.js");

const checkAuth = require("./utils/checkAuth.js");

mongoose
  .connect(
    "mongodb+srv://alexseva94:12345@cluster0.fuw8wdu.mongodb.net/blog?retryWrites=true&w=majority"
  )
  .then(() => console.log("database mongoDB atlas: ok!"))
  .catch((err) => console.log("database mongoDB atlas: ERROR!", err));
const PORT = 1313;

const app = express();

app.use(express.json());

app.post("/auth/login", loginValidator, login);

app.post("/auth/register", registerValidator, register);

app.get("/auth/me", checkAuth, getMe);

app.get("/posts", getAll);
app.get("/posts/:id", getOne);
app.post("/posts", checkAuth, postCreatedValidation, checkAuth, create);
app.delete("/posts/:id", checkAuth, remove);
app.patch("/posts/:id", checkAuth, update);

// how start the server
app.listen(PORT, (err) => {
  if (err) {
    return console.log(`server ${err}: OK!`);
  } else {
    console.log(`server ${PORT}: OK!`);
  }
});
