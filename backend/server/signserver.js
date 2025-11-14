const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("../routes/userRoutes");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
    .connect("mongodb://127.0.0.1:27017/signupdb", {
    })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("MongoDB connection error:", err));

// Routes
app.use("/api/users", userRoutes);

// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
