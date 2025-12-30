const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/sweetdelightdb');
        console.log('✅ MongoDB (Mongoose) Connected Successfully');
    } catch (err) {
        console.error('❌ Connection error:', err);
        process.exit(1);
    }
};

module.exports = connectDB;