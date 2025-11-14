// backend/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// ➕ CREATE Product
router.post('/', async (req, res) => {
    try {
        const product = new Product(req.body);
        const saved = await product.save();
        res.status(201).json(saved);
    } catch (err) {
        console.error(' Create error:', err);
        res.status(500).json({ message: 'Error creating product' });
    }
});

// 👁 GET All Products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching products' });
    }
});

// 👁 GET Single Product
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching product' });
    }
});

// ✏️ UPDATE Product
router.put('/:id', async (req, res) => {
    try {
        const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ message: 'Product not found' });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ message: 'Error updating product' });
    }
});

//  DELETE Product
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Product.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Product not found' });
        res.json({ message: 'Product deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting product' });
    }
});

module.exports = router;
