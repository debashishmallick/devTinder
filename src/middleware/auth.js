const User = require("../models/user");
const jwt  = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("invalid token");
    }

    const decodedData = await jwt.verify(token, "Dev@tinder$123");

    const { _id } = decodedData;

    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
};

module.exports = {
  userAuth,
};
