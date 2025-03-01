const { User } = require("../models/user");
const uploadOnCloudinary = require("../services/cloudinary");
const fs = require("fs");

async function handleSignUp(req, res) {
  const { fullName, email, password } = req.body;
  await User.create({ fullName, email, password });
  return res.redirect("/signin");
}

async function handleSignIn(req, res) {
  const { email, password } = req.body;
  try {
    const token = await User.matchPasswordAndGenerateToken(email, password);
    const thirtyDaysInMilliseconds = 30 * 24 * 60 * 60 * 1000;
    res.cookie("token", token, {
      maxAge: thirtyDaysInMilliseconds,
      httpOnly: true,
    });
    return res.redirect("/");
  } catch (error) {
    console.error("Error:", error.message);
    return res.render("Signin", {
      msg: error.message,
    });
  }
}

async function handleSignOut(req, res) {
  return res.clearCookie("token").redirect("/");
}

async function handleProfileImage(req, res) {
  const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
  if (cloudinaryResponse) {
    fs.unlinkSync(req.file.path);
    await User.updateOne(
      { _id: req.user.id },
      { $set: { profileImageUrl: cloudinaryResponse.url } }
    );
  }
  return res.redirect("/");
}

module.exports = {
  handleSignUp,
  handleSignIn,
  handleSignOut,
  handleProfileImage,
};
