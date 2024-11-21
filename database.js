// Import necessary libraries
const mongoose = require("mongoose");
require("dotenv").config();

// Define the connection URL and options
const fbDB = mongoose.createConnection(process.env.FB_MONGO_URL); 

module.exports = { fbDB };
