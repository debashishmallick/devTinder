const express = require("express");

const profileRouter = express.Router();
const { userAuth } = require("../middleware/auth");
const { validateEditProfileData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt"); // encrypt password

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    res.status(400).send("ERROR : " + error.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("invalid Edit Request");
    }
    const logedInUser = req.user;

    Object.keys(req.body).forEach((key) => (logedInUser[key] = req.body[key]));

    await logedInUser.save();

    res.json({
      message: `${logedInUser.firstName}, your profile Edit Successfuly`,
      data: logedInUser,
    });
  } catch (error) {
    res.status(400).send("ERROR : " + error.message);
  }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const checkUser = await User.findOne({ emailId });
    console.log(checkUser);
    if (!checkUser) {
      throw new Error("invalid user");
    }

    const allowUpdate = ["emailId", "password"];

    const isAllowedData = Object.keys(req.body).every((key) =>
      allowUpdate.includes(key)
    );

    if (!isAllowedData) throw new Error("invalid user");

    const newHashPassword = await bcrypt.hash(password, 10);

    const loggedInUser = await User.findOneAndUpdate(
      { emailId },
      { password: newHashPassword },
      { returnDocument: "after", runValidators: true }
    );

    res.status(201).json({
      message: `${loggedInUser.firstName} your passord is updated !!`,
    });
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

module.exports = profileRouter;
