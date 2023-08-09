import express from "express";
import jwt from "jsonwebtoken";
import cors from "cors";
import { User, Course } from "../db/database";
import { secretKey, authenticateJwt } from "../middleware/auth";
const app = express();

app.use(cors());
app.use(express.json());
const router = express.Router();

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user) {
    res.status(403).json({ message: "User already exists" });
  } else {
    const newUser = new User({ username, password });
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, secretKey, {
      expiresIn: "1h",
    });
    res.json({ message: "User created successfully", token });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.headers;
  const user = await User.findOne({ username, password });
  if (user) {
    const token = jwt.sign({ id: user._id }, secretKey, {
      expiresIn: "1h",
    });
    res.json({ message: "Logged in successfully", token });
  } else {
    res.status(403).json({ message: "Admin authentication failed" });
  }
});

router.get("/courses", authenticateJwt, async (req, res) => {
  const courses = await Course.find({ published: true });
  res.json({ courses });
});

router.post("/courses/:courseId", authenticateJwt, async (req, res) => {
  const course = await Course.findById(req.params.courseId);
  if (course) {
    const user = await User.findById(req.headers["userId"]);
    if (user) {
      user.purchasedCourses.push(course._id);
      await user.save();
      res.json({ message: "Course purchased successfully" });
    } else {
      res.status(403).json({ message: "User not found" });
    }
  } else {
    res.status(404).json({ message: "Course not found" });
  }
});

router.get("/purchasedCourses", authenticateJwt, async (req, res) => {
  const user = await User.findById(req.headers["userId"]).populate(
    "purchasedCourses"
  );
  if (user) {
    res.json({ purchasedCourses: user.purchasedCourses });
  } else {
    res.status(404).json({ message: "No courses purchased" });
  }
});

export default router;
