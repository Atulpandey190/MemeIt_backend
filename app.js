const express = require("express");
const cors = require("cors");
const bodyParser= require('body-parser')
require("./db/conn");
const Meme = require("./models/memes");
const port = process.env.PORT || 3001;
const collectionRouter = require("./routes/collectionRoutes");
const app = express();
app.use(express.json())
// app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors());
app.use("/api/v1/collections", collectionRouter);
// app.use('/uploads',express.static('uploads'))
app.listen(port, () => {
  console.log(`Connection is setup at ${port}`);
});
