const express = require("express");

const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser"); //reading cookies

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

//get user by email
// app.get("/user", async (req, res) => {
//   const userEmail = req.body.emailId;

//   try {
//     const user = await User.findOne({ emailId: userEmail });
//     if (user.length === 0) {
//       res.status(404).send("User not found !!!");
//     } else {
//       res.send(user);
//     }
//   } catch (error) {
//     res.status(400).send("Somthing went worng !!!");
//   }
// });

//Feed API - Get / feed get all the user from database
// app.get("/feed", async (req, res) => {
//   try {
//     const user = await User.find({});
//     res.send(user);
//   } catch (error) {
//     res.status(400).send("Somthing went worng !!!");
//   }
// });

// Delete a user from database
// app.delete("/user", async (req, res) => {
//   const userId = req.body.userId;
//   try {
//     const user = await User.findByIdAndDelete(userId);
//     res.send("Delete successfuly!!!");
//   } catch (error) {
//     res.status(400).send("Somthing  went wrong");
//   }
// });

//Update User Data..
// app.patch("/user/:userId", async (req, res) => {
//   const userId = req.params?.userId;
//   const data = req.body;

//   try {
//     const ALLOWED_UPDATE = ["about", "gender", "age", "photoUrl", "skills"];
//     const isUpdateAllowed = Object.keys(data).every((k) =>
//       ALLOWED_UPDATE.includes(k)
//     );
//     // console.log(isUpdateAllowed);
//     if (!isUpdateAllowed) {
//       throw new Error("Update not allowed !!!");
//     }

//     if (data.skills.length > 10) {
//       throw new Error("You Can't Store more than 10 Skills");
//     }

//     await User.findByIdAndUpdate(userId, data, {
//       returnDocument: "after",
//       runValidators: true,
//     });
//     res.send("update successfuly!!!");
//   } catch (err) {
//     res.status(400).send("Update Failed !!! " + err.message);
//   }
// });

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
