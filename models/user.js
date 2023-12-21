const { Schema, model } = require("mongoose");
const { randomBytes, createHmac } = require("crypto");
const { setUser } = require("../service/auth");

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    salt: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["User", "Admin"],
      default: "User",
    },
    profileImageUrl: {
      type: String,
      default: "/images/user-avatar.jpeg",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  const user = this;
  console.log(user);
  const salt = randomBytes(16).toString();
  console.log(salt);
  const hashedPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");
  console.log(hashedPassword);
  this.salt = salt;
  this.password = hashedPassword;
  next();
});

userSchema.static(
  "matchPasswordAndGenerateToken",
  async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) throw new Error("Incorrect Email");
    const salt = user.salt;
    const userProvidedPassword = password;
    const userOriginalPassword = user.password;

    const hashedPassword = createHmac("sha256", salt)
      .update(userProvidedPassword)
      .digest("hex");
    if (hashedPassword !== userOriginalPassword) {
      throw new Error("InCorrect Password");
    }
    const token = setUser(user);
    return token;
  }
);

const User = model("user", userSchema);

module.exports = { User };
