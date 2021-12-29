const express = require("express");
const router = express.Router();
require("../db/conn");
const Meme = require("../models/memes");
const multer = require("multer");
const { Mongoose } = require("mongoose");
const mongoose = require("mongoose");
const generateUploadURL = require("../s3");

router.get("/s3Url", async (req, res) => {
  const secureURL = await generateUploadURL();
  res.send({ secureURL });
});

module.exports = router;
