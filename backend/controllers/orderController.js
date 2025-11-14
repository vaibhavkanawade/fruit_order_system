// controllers/orderController.js
const Order = require('../models/order');
const crypto = require('crypto');

// Create new Order
exports.createOrder = async (req, res) => {
    try {
        const { name, contact, address, city, state, pincode, items, total } = req.body;

        const orderId = 'ORD-' + crypto.randomBytes(4).toString('hex').toUpperCase();

        const order = new Order({
            orderId,
            name,
            contact,
            address,
            city,
            state,
            pincode,
            items,
            total,
        });

        await order.save();
        res.status(201).json({ message: 'Order created', order });
    } catch (error) {
        console.error('❌ Error creating order:', error);
        res.status(500).json({ message: 'Failed to create order' });
    }
};

// Get all Orders
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        console.error('❌ Error fetching orders:', error);
        res.status(500).json({ message: 'Failed to fetch orders' });
    }
};

// Get Single Order by ID
exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.json(order);
    } catch (error) {
        console.error('❌ Error fetching order:', error);
        res.status(500).json({ message: 'Failed to fetch order' });
    }
};

// Update Order status (e.g., Delivered)
exports.updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const updated = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        res.json(updated);
    } catch (error) {
        console.error('❌ Error updating order status:', error);
        res.status(500).json({ message: 'Failed to update order status' });
    }
};

// Delete Order (optional)
exports.deleteOrder = async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.json({ message: 'Order deleted' });
    } catch (error) {
        console.error('❌ Error deleting order:', error);
        res.status(500).json({ message: 'Failed to delete order' });
    }
};
