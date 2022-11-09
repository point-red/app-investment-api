const mongoose = require("mongoose");
const { mongodbUri } = require("./config");

module.exports = async () => {
  try {
    await mongoose.connect(mongodbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (err) {
    console.log("Cannot connect to the database!", err);
    process.exit();
  }
};
