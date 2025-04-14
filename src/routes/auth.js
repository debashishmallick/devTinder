const express = require("express");
const authRouter = express.Router();

const { validateSignupData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt"); // encrypt password

authRouter.post("/signup", async (req, res) => {
  try {
    //check validation user data
    validateSignupData(req);

    const { firstName, lastName, emailId, password } = req.body;

    //Encrypted password
    const passwordHash = await bcrypt.hash(password, 10);

    //instance of user data
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();
    res.send("User Added Successfuly");
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    //check email validation
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("invalid user");
    }

    //check password compare validation
    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      // Create a JWT token
      const token = await user.getJWT();

      //Add the token to cookies and send the response back to the user
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });

      res.send("Login Successfully...");
    } else {
      throw new Error("invalid password");
    }
  } catch (error) {
    res.status(400).send("ERROR : " + error.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("logout successfuly");
});

module.exports = authRouter;
