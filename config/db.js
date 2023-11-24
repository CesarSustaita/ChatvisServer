const mongoose = require("mongoose");
require("dotenv").config({ path: "variables.env" });

const ConectarDB = async () => {
  try {
    await mongoose.connect(process.env.DB_MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("la base de datos se conecto");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = ConectarDB;
