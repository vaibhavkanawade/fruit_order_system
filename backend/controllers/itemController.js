const Item = require('../models/product');

exports.getItems = async (req, res) => {
    const items = await Item.find();
    res.json(items);
};

exports.getItemById = async (req, res) => {
    const item = await Item.findById(req.params.id);
    res.json(item);
};

exports.createItem = async (req, res) => {
    const newItem = new Item(req.body);
    const saved = await newItem.save();
    res.status(201).json(saved);
};

exports.updateItem = async (req, res) => {
    const updated = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
};

exports.deleteItem = async (req, res) => {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item deleted' });
};
