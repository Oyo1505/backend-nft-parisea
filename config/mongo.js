require("dotenv").config();
const mongoose = require("mongoose");
console.log(process.env.MONGO_URI);
// hey express, i would like to use mongoose to get a connection to my mongodb server
mongoose
  .connect(process.env.MONGO_URI)
  .then((dbConnectionResult) =>
    // everything is good ^^
    console.log(
      `Connected to Mongo! Database name: "${dbConnectionResult.connection.name}"`
    )
  )
  .catch((err) => {
    // an error occured
    console.error("Error connecting to mongo", err);
  });

/// npm install mongoose !!!
