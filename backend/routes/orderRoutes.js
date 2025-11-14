// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const { v4: uuidv4 } = require('uuid');

// 🟢 Create New Order
router.post('/', async (req, res) => {
    try {
        const orderId = uuidv4().split('-')[0].toUpperCase(); // small unique ID
        const order = new Order({ ...req.body, orderId });
        await order.save();
        res.status(201).json({ message: 'Order placed successfully', order });
    } catch (err) {
        console.error('Error saving order:', err);
        res.status(500).json({ error: 'Failed to place order' });
    }
});

// 🟡 Get All Orders
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
});

// 🟠 Update Order Status (Delivered)
router.put('/:id', async (req, res) => {
    try {
        const { status } = req.body;
        const updated = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update order' });
    }
});

module.exports = router;
