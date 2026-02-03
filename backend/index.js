const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");

const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks");
const profileRoutes = require("./routes/profile");

const app = express();

// ✅ THIS MUST BE BEFORE ROUTES
app.use(express.json());

// 🔗 MongoDB
mongoose
  .connect("mongodb://localhost:27017/taskmanager")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// Routes
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/tasks", taskRoutes);
app.use("/api/v1", profileRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
