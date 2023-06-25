const express = require("express");
const fs = require("fs");
const { register, login, getMe } = require("./controllers/UserController");
const multer = require("multer");
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

mongoose
  .connect(
    "mongodb+srv://alexseva94:12345@cluster0.fuw8wdu.mongodb.net/blog?retryWrites=true&w=majority"
  )
  .then(() => console.log("database mongoDB atlas: ok!"))
  .catch((err) => console.log("database mongoDB atlas: ERROR!", err));
const PORT = 1313;

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, callBack) => {
    //if not find , then create folder "uploads"
    if (!fc.existsSync("uploads")) {
      fs.mkdirSync("uploads");
    }

    callBack(null, "uploads");
  },
  filename: (_, file, callBack) => {
    callBack(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(cors());

app.post("/auth/login", loginValidator, handleValidationErrors, login);
app.post("/auth/register", registerValidator, handleValidationErrors, register);
app.get("/auth/me", checkAuth, getMe);

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

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
    console.log(`server ${PORT}: OK!`);
  }
});
