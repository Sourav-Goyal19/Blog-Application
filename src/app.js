require("dotenv").config();

const path = require("path");
const express = require("express");
const { connectMongoDB } = require("./connection");
const staticRouter = require("./routes/staticRoutes");
const userRouter = require("./routes/user");
const blogRouter = require("./routes/blog");
const commentRouter = require("./routes/comment");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const { checkAuth } = require("./middlewares/auth");
const cloudinary = require("cloudinary").v2;
const app = express();
const PORT = process.env.PORT;

connectMongoDB(process.env.MONGO_URL);

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `./public/uploads`);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const secondStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `./public/images`);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });
const upload2 = multer({ storage: secondStorage });

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.resolve("./public")));

app.use("/", checkAuth, staticRouter);
app.use("/user", upload2.single("profileImageUrl"), userRouter);
app.use("/blog", upload.single("coverImage"), blogRouter);
app.use("/comment", commentRouter);

app.get("/health", (req, res) => res.json({ msg: "Working well" }).status(200));

app.listen(PORT, () => console.log("Server Started at port:", PORT));
