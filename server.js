const express = require("express");
const { allRoutes } = require("./src/allroute/allroutes");
require("dotenv").config({ quiet: true });
const cors = require("cors");
const { connectToDatabase } = require("./src/config/db");
const { initializeUserTable } = require("./src/module/users/controller/addNewUser");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

connectToDatabase();

initializeUserTable();

app.use("/api/v1", allRoutes);

app.get("/api", (req, res) => {
  res.send("Server health is good");
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
