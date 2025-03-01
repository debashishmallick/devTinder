const express = require("express");

const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "Virat",
    lastName: "Kohli",
    emailId: "viratkohli@gmail.com",
    password: "virat@123",
    age: 34,
  });

  try {
    await user.save();
    res.send("User Added Successfuly");
  } catch (err) {
    res.status(400).send("Error saving the user:" + err.messege);
  }
});

connectDB()
  .then(() => {
    console.log("database connection successful...");

    app.listen(2001, () => {
      console.log("server is sucssesfull runing on 2001");
    });
  })
  .catch((err) => {
    console.error("database can't connected...");
  });
