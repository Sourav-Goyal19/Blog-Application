const mongoose = require("mongoose");

async function connectMongoDB(url) {
  try {
    await mongoose.connect(url);
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.log("Connect to MongoDB failed");
  }
}

module.exports = {
  connectMongoDB,
};
