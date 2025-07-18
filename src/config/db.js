require("dotenv").config();
const pkg=require("pg");

const { Pool } = pkg; // Destructure the Pool class from the package

// Configuration for the database connection
const dbConfig = {
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
};

// Create a new Pool instance for database connection
const pool = new Pool(dbConfig);

// Function to establish the database connection
const connectToDatabase = async () => {
  try {
    await pool.connect();
    console.log("Connect to the Database");
  } catch (error) {
    console.error("Error connecting to the database", error);
  }
};

module.exports={pool, connectToDatabase};
