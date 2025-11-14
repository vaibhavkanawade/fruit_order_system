// models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    name: String,
    contact: String,
    address: String,
    city: String,
    state: String,
    pincode: String,
    items: [
        {
            name: String,
            quantity: Number,
            price: Number,
        },
    ],
    total: Number,
    status: { type: String, default: 'Pending' },
    orderId: { type: String, unique: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);
