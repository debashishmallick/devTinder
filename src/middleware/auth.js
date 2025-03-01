const adminAuth = (req, res, next) => {
  console.log("admin auth is getting checked !");

  const token = "xyz";
  const isAdminAuthrized = token === "xyz";
  if (!isAdminAuthrized) {
    res.status(401).send("Unauthrized request");
  } else {
    next();
  }
};

const userAuth = (req, res, next) => {
  console.log("user auth is getting checked !");

  const token = "xyz";
  const isAdminAuthrized = token === "xyz";
  if (!isAdminAuthrized) {
    res.status(401).send("Unauthrized request");
  } else {
    next();
  }
};

module.exports = {
  adminAuth,
  userAuth,
};
