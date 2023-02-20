const mongoose = require("mongoose");
require("dotenv").config();

const connection = mongoose.connect(process.env.mongoDB_URL);

module.exports = { connection };
