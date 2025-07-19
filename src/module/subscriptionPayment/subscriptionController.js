const { pool } = require("../../config/db");
const stripe = require("../../config/stripe");
require("dotenv").config();

// POST /subscribe/pro
const subscribePro = async (req, res) => {
  const userId = req.user.id;
  const { email } = req.body;

  try {
    const customer = await stripe.customers.create({ email });

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      customer: customer.id,
      line_items: [
        {
          price: process.env.STRIPE_PRO_PLAN_PRICE_ID,
          quantity: 1,
        },
      ],
      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });

    // await pool.query(
    //   `INSERT INTO subscriptions (user_id, stripe_customer_id, plan, status) 
    //    VALUES ($1, $2, $3, $4) 
    //    ON CONFLICT (user_id) DO NOTHING`,
    //   [userId, customer.id, "pro", "pending"]
    // );

    await pool.query(
      `INSERT INTO subscriptions (user_id, stripe_customer_id, plan, status)
       VALUES ($1, $2, $3, $4)`,
      [userId, customer.id, "pro", "pending"]
    );

    res.json({ success: true, url: session.url });
  } catch (err) {
    console.error("Stripe Error:", err.message);
    res.status(500).json({ success: false, message: "Subscription failed" });
  }
};

// POST /webhook/stripe
const handleWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (
    ["customer.subscription.created", "customer.subscription.updated"].includes(
      event.type
    )
  ) {
    const sub = event.data.object;
    const customerId = sub.customer;
    const status = sub.status;
    const periodEnd = new Date(sub.current_period_end * 1000);

    await pool.query(
      `UPDATE subscriptions SET status=$1, current_period_end=$2 
       WHERE stripe_customer_id=$3`,
      [status, periodEnd, customerId]
    );
  }

  res.json({ received: true });
};

// GET /subscription/status
const getSubscriptionStatus = async (req, res) => {
  const userId = req.user.id;

  try {
    const { rows } = await pool.query(
      `SELECT plan, status FROM subscriptions WHERE user_id = $1`,
      [userId]
    );
    if (!rows.length) {
      return res.json({ plan: "basic", status: "inactive" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.log(err.message)
    res
      .status(500)
      .json({ success: false, message: "Unable to fetch subscription" });
  }
};

module.exports = {
  subscribePro,
  handleWebhook,
  getSubscriptionStatus,
};
