import express from "express";
import jwt from "jsonwebtoken";
import { Admin, Course } from "../db/database";
import { secretKey, authenticateJwt } from "../middleware/auth";
const app = express();

app.use(express.json());
const router = express.Router();

router.post("/signup", (req, res) => {
  const { username, password } = req.body;
  function callback(admin) {
    if (admin) {
      res.status(403).json({ message: "Admin already exists" });
    } else {
      const newAdmin = new Admin({ username, password });
      newAdmin.save();
      const token = jwt.sign({ id: newAdmin._id }, secretKey, {
        expiresIn: "1h",
      });
      res.json({ message: "Admin created successfully", token });
    }
  }
  Admin.findOne({ username }).then(callback);
});

router.get("/me", authenticateJwt, (req, res) => {
  res.json({ userId: req.headers["userId"] }); //check this out in frontend
});

router.post("/login", async (req, res) => {
  const { username, password } = req.headers;
  const admin = await Admin.findOne({ username, password });
  if (admin) {
    const token = jwt.sign({ id: admin._id }, secretKey, {
      expiresIn: "1h",
    });
    res.json({ message: "Logged in successfully", token });
  } else {
    res.status(403).json({ message: "Admin authentication failed" });
  }
});

router.post("/courses", authenticateJwt, async (req, res) => {
  const course = new Course(req.body);
  await course.save();
  res.json({ message: "Course created successfully", courseId: course.id });
});

router.get("/course/:courseId", authenticateJwt, async (req, res) => {
  const course = await Course.findById(req.params.courseId);
  if (course) {
    res.json({ course: course });
  } else {
    res.status(404).json({ message: "Course not found" });
  }
});

router.put("/courses/:courseId", authenticateJwt, async (req, res) => {
  // const courseId = parseInt();
  // const course = Course.findOne(id)
  const course = await Course.findByIdAndUpdate(req.params.courseId, req.body);
  if (course) {
    res.json({ message: "Course updated successfully" });
  } else {
    res.status(404).json({ message: "Course not found" });
  }
});

router.get("/courses", authenticateJwt, async (req, res) => {
  const courses = await Course.find({});
  res.json({ courses });
});

export default router;
