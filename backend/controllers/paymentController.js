const Razorpay = require("razorpay");
const crypto = require("crypto");
const Order = require("./models/Order");

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ✅ Create Razorpay Order
exports.createOrder = async (req, res) => {
    try {
        const { amount } = req.body;
        const options = {
            amount: amount * 100,
            currency: "INR",
            receipt: `order_rcptid_${Date.now()}`,
        };
        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to create Razorpay order" });
    }
};

// ✅ Verify Payment & Save Order in DB
exports.verifyPayment = async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            cartItems,
            amount,
            user,
        } = req.body;

        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(sign)
            .digest("hex");

        if (expectedSign !== razorpay_signature) {
            return res.status(400).json({ success: false, message: "Invalid signature" });
        }

        // ✅ Signature is valid — Save order to DB
        const newOrder = new Order({
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            amount,
            items: cartItems,
            user,
            status: "Paid",
        });

        await newOrder.save();

        res.json({ success: true, message: "Payment verified & order stored" });
    } catch (err) {
        console.error("Error verifying payment:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
