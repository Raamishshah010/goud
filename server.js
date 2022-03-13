const express = require("express"); //Import the express dependency
require("dotenv").config();
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const routes = require("./routes/index");
const multer = require("multer");
const path = require("path");
require("./config/database").connect();
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

//uploading product image to server
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});

// parse application/json
app.use(bodyParser.json());
app.use(express.json({ extended: true }));

app.use(multer({ storage: fileStorage }).single("file"));
app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/", routes);
app.get("/", (req, res) => {
  res.json({ message: "Welcome to GOUD App." });
});

const port = 8000;
app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
});
