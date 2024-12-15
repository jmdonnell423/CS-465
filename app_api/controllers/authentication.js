const mongoose = require('mongoose');
const User = require('../models/user'); // Adjust path as necessary

// Register function
const register = async (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.password) {
        return res.status(400).json({ "message": "All fields required" });
    }

    try {
        const user = new User();
        user.name = req.body.name;
        user.email = req.body.email;
        user.setPassword(req.body.password);

        // Save the user and handle the result
        await user.save();
        const token = user.generateJwt();
        res.status(200).json({ token });
    } catch (err) {
        res.status(400).json(err);
    }
};

// Login function
const login = async (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ "message": "All fields required" });
    }

    try {
        console.log("Login request for email:", req.body.email); // Debug log
        const user = await User.findOne({ email: req.body.email });
        
        if (!user) {
            console.log("User not found for email:", req.body.email); // Debug log
            return res.status(401).json({ "message": "Invalid email or password" });
        }

        const isPasswordValid = user.validPassword(req.body.password);
        console.log("Password valid:", isPasswordValid); // Debug log

        if (!isPasswordValid) {
            return res.status(401).json({ "message": "Invalid email or password" });
        }

        const token = user.generateJwt();
        await user.save(); // Save the token in the database
        console.log("Generated token:", token); // Debug log

        res.status(200).json({ token });
    } catch (err) {
        console.error("Login error:", err); // Debug log
        res.status(500).json({ "message": "An error occurred during login", "error": err.message });
    }
};

module.exports = {
    register,
    login
};

