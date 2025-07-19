const express = require("express");
const { allRoutes } = require("./src/allroute/allroutes");
require("dotenv").config({ quiet: true });
const cors = require("cors");
const { connectToDatabase, pool } = require("./src/config/db");
const {
  initializeUserTable,
} = require("./src/module/users/controller/addNewUser");

const app = express();
app.use(express.json());
app.use(cors());

connectToDatabase();
// initializeUserTable();

const initializeSubscriptionsTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS subscriptions (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL,
      stripe_customer_id VARCHAR NOT NULL,
      plan VARCHAR NOT NULL,
      status VARCHAR NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  try {
    await pool.query(query);
    console.log("✅ Subscriptions table is ready.");
  } catch (err) {
    console.error("❌ Error creating subscriptions table:", err.message);
  }
};

initializeSubscriptionsTable();


app.use("/api/v1", allRoutes);

app.get("/api", (req, res) => {
  res.send("Server health is good");
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
