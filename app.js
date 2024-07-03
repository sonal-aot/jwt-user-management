const express = require("express");
const app = express();
app.use(express.json());
const router = require("./router");

app.use(router);

app.listen(3000, () => {
  console.log("====================================");
  console.log("Server is Running");
  console.log("====================================");
});
