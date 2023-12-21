const { User } = require("../models/user");

async function handleSignUp(req, res) {
  const { fullName, email, password } = req.body;
  await User.create({ fullName, email, password });
  return res.redirect("/signin");
}

async function handleSignIn(req, res) {
  const { email, password } = req.body;

  try {
    const token = await User.matchPasswordAndGenerateToken(email, password);
    res.cookie("token", token);
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
  await User.updateOne(
    { _id: req.user.id },
    { $set: { profileImageUrl: `/images/${req.file.filename}` } }
  );
  return res.redirect("/");
}

module.exports = {
  handleSignUp,
  handleSignIn,
  handleSignOut,
  handleProfileImage,
};
