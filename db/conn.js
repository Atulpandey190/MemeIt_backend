const mongoose = require("mongoose");

// Connecting to database
//mongoose.connect returns a promise
mongoose
  .connect("mongodb://localhost:27017/memesdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Database Connected Succesfully");
  })
  .catch((e) => {
    console.log("Database Connection Error");
  });
