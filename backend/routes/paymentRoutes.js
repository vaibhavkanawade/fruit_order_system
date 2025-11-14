const express = require("express");
const { createOrder, verifyPayment } = require("../controllers/paymentController");
const Order = require("./models/Order");

const router = express.Router();

router.post("/create-order", createOrder);
router.post("/verify-payment", verifyPayment);

// 📝 Fetch all orders (for testing)
router.get("/orders", async (req, res) => {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
});

module.exports = router;
