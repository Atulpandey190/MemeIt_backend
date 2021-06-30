const express = require("express");
const router = express.Router();
require("../db/conn");
const Meme = require("../models/memes");
const multer = require("multer");
const { Mongoose } = require("mongoose");
const mongoose = require("mongoose");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
});
router.get("/", (req, res) => {
  Meme.find({}, (err, items) => {
    if (err) {
      console.log(err);
      res.status(500).send("An error occurred", err);
    } else {
      res.json({
        items: items,
      });
    }
  });
});
router.get("/:id", (req, res) => {
  // console.log(req.params.id);
  const idValidator = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!idValidator) {
    res.status(500).send("InvalidID");
  } else {
    Meme.findById({ _id: req.params.id }, (err, items) => {
      if (err) {
        console.log(err);
        res.status(500).send("An error occurred", err);
      } else {
        res.json({
          items: items,
        });
      }
    });
  }
});
router.post("/", upload.single("memeImage"), (req, res) => {
  //   console.log(req.file);
  const newMeme = new Meme({
    name: req.body.name,
    tags: req.body.tags,
    memeImage: req.file.path,
  });

  newMeme
    .save()
    .then(() => {
      res.status(201).send(newMeme);
    })
    .catch((e) => {
      console.log(e);
      res.status(400).send(e);
    });
});

module.exports = router;
