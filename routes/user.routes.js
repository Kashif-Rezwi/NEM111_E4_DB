const express = require("express");
const bcrypt = require("bcrypt");
const { UserModel } = require("../model/user.model");
const jwt = require("jsonwebtoken");

const userRouter = express.Router();

// register request
userRouter.post("/register", async (req, res) => {
  const { name, email, gender, password, age, city } = req.body;
  try {
    const user = await UserModel.find({ email: email });
    if (user.length > 0) {
      res.send({ msg: "User already exist! please login!" });
      console.log("User already exist! please login!");
    } else {
      bcrypt.hash(password, 5, async (err, hash) => {
        if (err) {
          res.send(err.message);
        } else {
          const user = new UserModel({
            name,
            email,
            gender,
            password: hash,
            age,
            city,
          });
          await user.save();
          res.send(
            "Registration has been done, user account created successfully."
          );
        }
      });
    }
  } catch (err) {
    res.send(err.message);
    console.log(err.message);
  }
});

// login request
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.find({ email: email });
    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, async (err, result) => {
        if (result) {
          const token = jwt.sign({ userID: user[0]._id }, "masaischool");
          res.send({ msg: "User login successfully.", token: token });
          console.log("User login successfully.");
        } else {
          res.send({ msg: "Wrong Crenentials!" });
          console.log("Wrong Crenentials!");
        }
      });
    } else {
      res.send({ msg: "Wrong Crenentials!" });
      console.log("Wrong Crenentials!");
    }
  } catch (err) {
    res.send(err.message);
    console.log(err.message);
  }
});

module.exports = { userRouter };
