const express = require("express");
const { PostModel } = require("../model/post.model");

const postRouter = express.Router();

// get request with query
postRouter.get("/", async (req, res) => {
  const { userID } = req.body;
  const Query = req.query;
  //   const { device1, device2 } = Query;

  //   if (device1 && device2) {
  //     try {
  //       const posts = await PostModel.find({
  //         $and: [{ userID: userID }, { device: device1 }, { device: device2 }],
  //       });
  //       res.send(posts);
  //       console.log("Posts get request has been made successfully.");
  //     } catch (err) {
  //       res.send(err.message);
  //       console.log(err.message);
  //     }
  //   } else {
  try {
    const posts = await PostModel.find({ $and: [{ userID: userID }, Query] });
    res.send(posts);
    console.log("Posts get request has been made successfully.");
  } catch (err) {
    res.send(err.message);
    console.log(err.message);
  }
  //   }
});

// get request with params
postRouter.get("/:id", async (req, res) => {
  const { userID } = req.body;
  const { id } = req.params;
  try {
    const post = await PostModel.find({ userID: userID, _id: id });
    res.send(post);
    console.log("Posts get request with params has been made successfully.");
  } catch (err) {
    res.send(err.message);
    console.log(err.message);
  }
});

// post request
postRouter.post("/create", async (req, res) => {
  const payload = req.body;
  try {
    const post = new PostModel(payload);
    await post.save();
    res.send(post);
    console.log("Post has been created successfully.");
  } catch (err) {
    res.send(err.message);
    console.log(err.message);
  }
});

// patch request
postRouter.patch("/update/:id", async (req, res) => {
  const payload = req.body;
  const { id } = req.params;
  try {
    await PostModel.findByIdAndUpdate({ _id: id }, payload);
    const post = await PostModel.find({ _id: id });
    res.send(post);
    console.log("Post has been updated successfully.");
  } catch (err) {
    res.send(err.message);
    console.log(err.message);
  }
});

// delete request
postRouter.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const post = await PostModel.find({ _id: id });
    await PostModel.findByIdAndDelete({ _id: id });
    res.send(post);
    console.log("Post has been deleted successfully.");
  } catch (err) {
    res.send(err.message);
    console.log(err.message);
  }
});

module.exports = { postRouter };
