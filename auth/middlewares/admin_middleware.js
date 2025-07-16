const isAdminUser = (req, res, next) => {
  if (req.userInfo.role !== "admin") {
    res.status(401).json({
      success: false,
      message: "You have no authorization to login",
    });
  }

  next();
};

module.exports = isAdminUser;
