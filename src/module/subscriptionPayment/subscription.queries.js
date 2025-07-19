const createSubsriptionTable = `
CREATE TABLE subscriptions (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL,
  stripe_customer_id VARCHAR(255),
  stripe_subscription_id VARCHAR(255),
  plan VARCHAR(50) DEFAULT 'basic',
  status VARCHAR(50),
  current_period_end TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);
`;

const insertSubscriptionQuery = `
INSERT INTO subscriptions (user_id, stripe_customer_id, stripe_subscription_id, plan, status, current_period_end)  
VALUES ($1, $2, $3, $4, $5, $6)
RETURNING *;
`;

const getAllSubscriptionQuery =
  "SELECT * FROM subscriptions WHERE user_id = $1;";

const getSubscriptionByIdQuery = "SELECT * FROM subscriptions WHERE id = $1;";




module.exports = {
  createSubsriptionTable,
  insertSubscriptionQuery,
  getAllSubscriptionQuery,
  getSubscriptionByIdQuery,
};
