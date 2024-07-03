const express = require("express");
const router = require("./Router/router");
const app = express();
app.use(express.json());

app.use(router);

app.listen(3000, () => {
  console.log("====================================");
  console.log("Server is Running");
  console.log("====================================");
});
