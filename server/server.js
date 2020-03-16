const express = require("express");
const app = express();
const PORT = 3000;
const path = require("path");

// statically serve everything in the build folder on the route '/build'
app.use("/build", express.static(path.join(__dirname, "../build")));

// sends the html file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../src/index.html"));
});

// global error handler
app.use((err, req, res) => {
  const defaultErr = {
    log: "Express error handler caught unknown error",
    status: 400,
    message: { err: "An error occurred" }
  };

  const errorObj = Object.assign(defaultErr, err);
  res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT);
