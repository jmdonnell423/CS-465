const mongoose = require('mongoose');
const Trip = require('../models/travlr');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

// Helper: Get user from token payload
const getUser = async (req, res, callback) => {
    console.log("Authorization Header in getUser:", req.headers.authorization); // Debug log
    console.log("Payload in getUser:", req.payload); // Debug log

    if (req && req.payload && req.payload.email) {
        try {
            const user = await User.findOne({ email: req.payload.email }).exec();
            if (!user) {
                console.log("User not found:", req.payload.email); // Debug log
                return res.status(404).json({ message: "User not found" });
            }
            console.log("User found:", user.email); // Debug log
            callback(req, res, user.name);
        } catch (err) {
            console.error("Error retrieving user:", err.message); // Debug log
            res.status(500).json({ message: "Error retrieving user", error: err.message });
        }
    } else {
        console.error("Unauthorized access, missing payload:", req.payload); // Debug log
        res.status(401).json({ message: "Unauthorized" });
    }
};

// Get a list of all trips
const tripsList = async (req, res) => {
    console.log("Fetching all trips..."); // Debug log
    try {
        const trips = await Trip.find({}).exec();
        if (!trips || trips.length === 0) {
            console.log("No trips found"); // Debug log
            return res.status(404).json({ message: 'No trips found' });
        }
        console.log("Trips found:", trips.length); // Debug log
        res.status(200).json(trips);
    } catch (err) {
        console.error("Error retrieving trips:", err.message); // Debug log
        res.status(500).json({ message: "Error retrieving trips", error: err.message });
    }
};

// Add a new trip
const tripsAddTrip = async (req, res) => {
    console.log("Adding a new trip..."); // Debug log
    console.log("Authorization Header in tripsAddTrip:", req.headers.authorization); // Debug log

    if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log("Manually Decoded Token in tripsAddTrip:", decoded); // Debug log
        } catch (err) {
            console.error("Error manually decoding token:", err.message); // Debug log
        }
    }

    getUser(req, res, async (req, res, userName) => {
        try {
            const newTrip = await Trip.create({
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description,
            });
            console.log("New trip created by user:", userName); // Debug log
            res.status(201).json(newTrip); // 201: Created
        } catch (err) {
            console.error("Error creating trip:", err.message); // Debug log
            res.status(400).json({ message: "Error creating trip", error: err.message });
        }
    });
};

// Find a trip by its code
const tripsFindByCode = async (req, res) => {
    console.log("Fetching trip by code:", req.params.tripCode); // Debug log
    try {
        const trip = await Trip.findOne({ code: req.params.tripCode }).exec();
        if (!trip) {
            console.log(`Trip with code ${req.params.tripCode} not found`); // Debug log
            return res.status(404).json({ message: `Trip with code ${req.params.tripCode} not found` });
        }
        console.log("Trip found:", trip); // Debug log
        res.status(200).json(trip);
    } catch (err) {
        console.error("Error retrieving trip:", err.message); // Debug log
        res.status(500).json({ message: "Error retrieving trip", error: err.message });
    }
};

// Update an existing trip
const tripsUpdateTrip = async (req, res) => {
    console.log("Updating trip by code:", req.params.tripCode); // Debug log
    getUser(req, res, async (req, res, userName) => {
        try {
            const updatedTrip = await Trip.findOneAndUpdate(
                { code: req.params.tripCode },
                {
                    code: req.body.code,
                    name: req.body.name,
                    length: req.body.length,
                    start: req.body.start,
                    resort: req.body.resort,
                    perPerson: req.body.perPerson,
                    image: req.body.image,
                    description: req.body.description,
                },
                { new: true } // Return updated document
            ).exec();

            if (!updatedTrip) {
                console.log(`Trip with code ${req.params.tripCode} not found`); // Debug log
                return res.status(404).json({ message: `Trip with code ${req.params.tripCode} not found` });
            }
            console.log("Trip updated by user:", userName); // Debug log
            res.status(200).json(updatedTrip);
        } catch (err) {
            console.error("Error updating trip:", err.message); // Debug log
            res.status(400).json({ message: "Error updating trip", error: err.message });
        }
    });
};

module.exports = {
    tripsList,
    tripsAddTrip,
    tripsFindByCode,
    tripsUpdateTrip,
};



