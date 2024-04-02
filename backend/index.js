const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 8000;
const multer = require("multer");
const userData = require("./userDataModel.js");
var bodyParser = require("body-parser");
const cors = require("cors");
// const upload = multer({ dest: './pics' })
app.use(cors());
app.use(express.json()); // Make sure to use body-parser to parse JSON bodies
app.use(bodyParser.json());

app.use(express.static("public")) //!most important thing for uploading image

app.listen(port, () => {
  console.log(`listening at port ${port}`);
});

mongoose
  .connect("mongodb://127.0.0.1:27017/multer")
  .then(() => {
    console.table("connected");
  })
  .catch((error) => {
    console.log("failed", error);
  });


// //! multer start ---------->
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/pics");
  },
  filename: function (req, file, cb) {
    // cb(null, file.originalname);
    // cb(null, `${Date.now()}-${file.originalname}`);
    cb(null, `${ Math.round(Math.random() * 1E9)}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

// //! multer ends ---------->
app.post("/upload", upload.single("file"), async (req, res) => {
  console.log(req.body);
  const imageName = req.file.filename;
  try {
    await userData.create({ image: imageName });
    res.json({ message: "ok" });
  } catch (error) {
    res.json({ status: error });
  }
  } 
);

app.get("/pics/", async(req,res)=>{
  try {
    userData.find({}).then((data) => {
      // res.send(data);
      res.send({ status: "ok", data: data });
    });
  } catch (error) {
    res.json({ status: error });
  }
})