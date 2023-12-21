const jwt = require("jsonwebtoken");
const secretKey = "#SouravG#";

const setUser = (user) => {
  const token = jwt.sign(
    {
      fullName: user.fullName,
      email: user.email,
      id: user._id,
      profileImageUrl: user.profileImageUrl,
      role: user.role,
    },
    secretKey
  );
  return token;
};

const getUser = (token) => {
  if (!token) return null;
  const user = jwt.verify(token, secretKey);
  if (!user) return null;
  return user;
};

module.exports = { setUser, getUser };
