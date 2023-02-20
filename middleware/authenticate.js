const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (token) {
      jwt.verify(token, "masaischool", async (err, decoded) => {
        if (decoded) {
          req.body.userID = decoded.userID;
          next();
        } else {
          res.send({ msg: err.message });
          console.log(err.message);
        }
      });
    } else {
      res.send({ msg: "Please login first!" });
      console.log("Please login first!");
    }
  } catch (err) {
    res.send({ msg: err.message });
    console.log(err.message);
  }
};

module.exports = { authenticate };
