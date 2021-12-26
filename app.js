const express = require("express");
require("./db/conn");
const Meme = require("./models/memes");
const port = process.env.PORT || 5000;
const collectionRouter = require("./routes/collectionRoutes");
const app = express();

app.use(express.json());

app.use("/api/v1/collections", collectionRouter);
// app.use('/uploads',express.static('uploads'))
app.listen(port, () => {
  console.log(`Connection is setup at ${port}`);
});
