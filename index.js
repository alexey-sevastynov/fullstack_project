const express = require("express");

const PORT = 4444;

const app = express();

app.get("/", (request, response) => {
  //"request" from Frontend
  response.send("hello world"); // show message frontend on page
});

// how start the server
app.listen(PORT, (err) => {
  if (err) {
    return console.log(`server ${err}: OK!`);
  } else {
    console.log(`server ${PORT}: OK!`);
  }
});
