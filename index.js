const express = require("express");
const cors = require("cors");
const { connection } = require("./config/db");
const { userRouter } = require("./routes/user.routes");
const { postRouter } = require("./routes/post.routes");
const { authenticate } = require("./middleware/authenticate");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Wellcome to LinkedIn database");
});

app.use("/users", userRouter);

app.use(authenticate);

app.use("/posts", postRouter);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connected to Mongodb.");
  } catch (err) {
    console.log(err.message);
  }
});
