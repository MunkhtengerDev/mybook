const dotenv = require('dotenv')
const mongoose = require("mongoose");
const colors = require("colors");
mongoose.set('strictQuery', true);
mongoose.Promise = global.Promise;

dotenv.config()

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log(
      `Connected to Mongodb Database ${mongoose.connection.host}`.bgMagenta
        .white
    );
  } catch (error) {
    console.log(`MONGO Connect Error --- ${error}`.bgRed.white);
  }
};

module.exports = connectDB;