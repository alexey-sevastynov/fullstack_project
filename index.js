const express = require("express");
const jwt = require("jsonwebtoken");

const PORT = 4444;

const app = express();

app.use(express.json());

app.get("/", (request, response) => {
  //"request" from Frontend
  response.send("hello world"); // show message frontend on page
});

app.post("/auth/login", (req, res) => {
  console.log(req.body);

  const token = jwt.sign(
    {
      email: req.body.email,
      fullName: "Alexey Sevastnov",
    },
    "secretKey"
  );

  res.json({ success: true, token });
});

// how start the server
app.listen(PORT, (err) => {
  if (err) {
    return console.log(`server ${err}: OK!`);
  } else {
    console.log(`server ${PORT}: OK!`);
  }
});
