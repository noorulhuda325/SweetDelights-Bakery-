const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./db'); // db.js ka connection
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '.'))); 

// 1. Database Connection Call
connectDB();

// 2. Mongoose Schema for Orders/Products
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    mobile: { type: String, required: true },
    cake_flavor: String,
    cupcake_flavor: String,
    bars_pastries: String,
    design_theme: String,
    special_request: String,
    order_type: [String],
    pickup_time: String,
    delivery_time: String,
    payment_method: [String],
    created_at: { type: Date, default: Date.now }
}, { collection: 'orders' });

const Product = mongoose.model('Product', productSchema);

// Schema for Contact Messages (Purane code se)
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    subject: String,
    message: String
}, { collection: 'contacts' });
const Contact = mongoose.model('Contact', contactSchema);

// --- ROUTES ---

// 1. Order Save Route (Naya)
app.post('/api/order', async (req, res) => {
    try {
        const newProductOrder = new Product(req.body);
        await newProductOrder.save();
        res.status(201).json({ success: true, message: 'Order placed successfully!' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// 2. Contact Form Route (Purana feature)
app.post('/api/contact', async (req, res) => {
    try {
        const newContact = new Contact(req.body);
        await newContact.save();
        res.status(201).json({ success: true, message: 'Message sent successfully!' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// 3. Admin Panel Data Route (Naya)
app.get('/api/orders', async (req, res) => {
    try {
        const allOrders = await Product.find().sort({ created_at: -1 });
        res.json(allOrders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});