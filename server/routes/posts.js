const express = require("express");
const router = express.Router();
const { Posts, validatePost } = require("../modules/postModule");
const axios = require("axios");

router.get("/", async (req, res) => {
  try {
    let data = [];

    let result = await axios.get("https://jsonplaceholder.typicode.com/posts");
    console.log(result);
    data = result.data;

    if (data.length > 0) {
      for (i = 0; i < data.length; i++) {
       
        const { error } = validatePost(data[i]);
        if (error) return res.status(400).send(error.details[0].message);

        let posts = new Posts({
          userId: data[i].userId,
          id: data[i].id,
          title: data[i].title,
          body: data[i].body,
        });
        let result = await posts.save();
      }
      res.send(result);
    } else {
      res.status(500).send("could not find the json place holder api");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.get("/:userId", async (req, res) => {
  try {
    if (req.params.userId) {
      const posts = await Posts.find({ userId: req.params.userId });

      if (posts.length > 0) res.send(posts);
      else res.status(404).send("this user is not exists ");
    }
  } catch (error) {
    res.status(502).send(error.message);
  }
});

module.exports = router;