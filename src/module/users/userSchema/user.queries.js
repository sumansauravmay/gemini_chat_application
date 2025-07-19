const createUserTableQuery = `
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY, 
    name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(255),
    password VARCHAR(255),
    otp VARCHAR(6),
    otp_expires_at TIMESTAMP,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

const insertUserQuery = `
INSERT INTO users (name, email, phone, password)
VALUES ($1, $2, $3, $4)
RETURNING *;
`;

const updateUserQuery = `
UPDATE users
SET name = $2, email = $3, phone = $4, password = $5, otp = $6, otp_expires_at = $7, is_verified = $8
WHERE id = $1
RETURNING *;
`;

const getAllUserQuery = "SELECT * FROM users;";
const getUsersByIdQuery = "SELECT * FROM users WHERE id = $1;";

module.exports = {
  createUserTableQuery,
  insertUserQuery,
  updateUserQuery,
  getAllUserQuery,
  getUsersByIdQuery,
};
