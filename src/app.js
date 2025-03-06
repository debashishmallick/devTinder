const express = require("express");

const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json());

app.post("/signup", async (req, res) => {
  console.log(req.body);
  const user = new User(req.body);

  try {
    await user.save();
    res.send("User Added Successfuly");
  } catch (err) {
    res.status(400).send("Error saving the user:" + err.message);
  }
});

//get user by email
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    const user = await User.findOne({ emailId: userEmail });
    if (user.length === 0) {
      res.status(404).send("User not found !!!");
    } else {
      res.send(user);
    }
  } catch (error) {
    res.status(400).send("Somthing went worng !!!");
  }
});

//Feed API - Get / feed get all the user from database
app.get("/feed", async (req, res) => {
  try {
    const user = await User.find({});
    res.send(user);
  } catch (error) {
    res.status(400).send("Somthing went worng !!!");
  }
});

// Delete a user from database
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete(userId);
    res.send("Delete successfuly!!!");
  } catch (error) {
    res.status(400).send("Somthing  went wrong");
  }
});

//Update User Data..
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  try {
    const ALLOWED_UPDATE = ["about", "gender", "age", "skills"];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATE.includes(k)
    );
    console.log(isUpdateAllowed);
    if (!isUpdateAllowed) {
      throw new Error("Update not allowed !!!");
    }

    if(data.skills.length>10){
      throw new Error("You Can't Store more than 10 Skills")
    }

    await User.findByIdAndUpdate(userId, data, {
      returnDocument: "after",
      runValidators: true,
    });
    res.send("update successfuly!!!");
  } catch (err) {
    res.status(400).send("Update Failed !!! " + err.message);
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
