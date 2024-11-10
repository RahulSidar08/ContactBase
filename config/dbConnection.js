const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(
      "mongodb://127.0.0.1:27017/ContactManagement"
    );
    console.log("Connect to MongoDB")
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDb;