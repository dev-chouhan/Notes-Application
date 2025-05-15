const mongoose = require("mongoose");

// MongoDB connection URI from environment variable
const mongoURI = process.env.MONGODB_URI;

const connectToMongo = async () => {
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB Successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1);
    }
};

module.exports = connectToMongo;