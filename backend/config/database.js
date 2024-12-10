const mongoose = require('mongoose');
const password = encodeURIComponent("J3@E#FHy3bYZxe.");
const MONGO_URL = `mongodb+srv://Shafi:${password}@digital-wallet.nfaon.mongodb.net/?retryWrites=true&w=majority&appName=Digital-wallet`;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("database is connected successfully!");
  } catch (err) {
    console.log(err);
  }
};
module.exports = connectDB;