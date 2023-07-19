const express = require("express");

const { register, login, getMe } = require("./controllers/UserController");

const handleValidationErrors = require("./utils/handleValidationErrors");
const cors = require("cors");

const {
  create,
  getAll,
  getLastTags,
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

require("dotenv").config();

mongoose
  .connect(
    "mongodb+srv://alexseva94:12345@cluster0.fuw8wdu.mongodb.net/blog?retryWrites=true&w=majority"
  )
  .then(() => console.log("database mongoDB atlas: ok!"))
  .catch((err) => console.log("database mongoDB atlas: ERROR!", err));
const PORT = 1313;

const app = express();

app.use(cors());
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb" }));

app.post("/auth/login", loginValidator, handleValidationErrors, login);
app.post("/auth/register", registerValidator, handleValidationErrors, register);
app.get("/auth/me", checkAuth, getMe);

app.get("/posts", getAll);
app.get("/tags", getLastTags);
app.get("/posts/tags", getLastTags);
app.get("/posts/:id", getOne);
app.post(
  "/posts",
  checkAuth,

  postCreatedValidation,
  handleValidationErrors,
  create
);
app.delete("/posts/:id", checkAuth, remove);
app.patch(
  "/posts/:id",
  checkAuth,
  postCreatedValidation,
  handleValidationErrors,
  update
);

// how start the server
app.listen(PORT, (err) => {
  if (err) {
    return console.log(`server ${err}: OK!`);
  } else {
    console.log(`server http://localhost:${PORT}/ OK!`);
  }
});
