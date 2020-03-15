const express = require("express");
const app = express();
const PORT = 3000;
const path = require("path");

// statically serve everything in the build folder on the route '/dist'
app.use("/build", express.static(path.join(__dirname, "../build")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../src/index.html"));
});

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 400,
    message: { err: "An error occurred" }
  };

  const errorObj = Object.assign(defaultErr, err);
  console.log(errorObj.message);
  res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
