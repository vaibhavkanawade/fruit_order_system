
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: String,
    tag: String,
    price: Number,
    quantity: Number,
    image: String
}, { timestamps: true });

module.exports = mongoose.models.Product || mongoose.model('product', productSchema);

