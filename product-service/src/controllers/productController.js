const Product = require('../models/productModel');
const { sendMessage } = require('../../../shared/utils/messageQueue');

async function createProduct(req, res) {
  try {
    const product = new Product(req.body);
    await product.save();
    sendMessage('product_events', { type: 'PRODUCT_CREATED', payload: product });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getProducts(req, res) {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { createProduct, getProducts };
