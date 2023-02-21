const { default: mongoose } = require("mongoose");

module.exports = function dbConnect(uri) {
  try {
    mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const connection = mongoose.connection;

    connection.once("open", () => {
      console.log("Connected Database Successfully");
    });
  } catch (error) {
    console.log("Databse connect Fail");
  }
};
