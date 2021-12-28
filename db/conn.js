const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Connecting to database
//mongoose.connect returns a promise
dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Connected Succesfully");
  })
  .catch((e) => {
    console.log(e)
    console.log("Database Connection Error");
  });
