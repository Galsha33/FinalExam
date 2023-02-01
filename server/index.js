const express = require("express");
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const cors = require("cors");

const app = express();

const posts = require("./routes/posts");

mongoose
  .connect("mongodb://127.0.0.1:27017/finalExam")
  .then(() => {
    console.log("connected");
  })
  .catch(() => {
    console.log("couldnt connect");
  });


app.use(express.json());
app.use(cors());

app.use("/api/posts", posts);

const port = process.env.PORT || 3500; 

app.listen(port, () => console.log(`active on ${port}`))