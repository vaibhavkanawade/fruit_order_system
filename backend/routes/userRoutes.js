const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const router = express.Router();

//  Signup route
router.post("/signup", async (req, res) => {
    try {
        const { email, username, password, role, contact } = req.body;

        if (!email || !username || !password || !role || !contact) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if user already exists
        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            email,
            username,
            password: hashedPassword,
            role,
            contact,
        });

        await newUser.save();

        res.json({ message: "Signup successful", user: newUser });
    } catch (err) {
        console.error("Signup error:", err);
        res.status(500).json({ message: "Server error" });
    }
});

//  Login route (optional, for later)
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        // 🔍 Allow login by username
        const user = await User.findOne({
            $or: [{ username }, { email: username }]
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        res.json({ message: "Login successful", user });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Server error" });
    }
});


module.exports = router;
