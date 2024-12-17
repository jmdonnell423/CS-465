const express = require('express');
const router = express.Router();
const tripsController = require('../controllers/trips');
const authMiddleware = require('../controllers/authentication'); // Middleware to validate token

// Authentication routes
const ctrlAuth = require('../controllers/authentication'); // Import authentication controller

router
    .route('/login')
    .post(ctrlAuth.login);

router
    .route('/register')
    .post(ctrlAuth.register);

// Trips routes
router
    .route('/trips')
    .get(tripsController.tripsList) // Public route
    .post(ctrlAuth, tripsController.tripsAddTrip); // Protected route

router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode) // Public route
    .put(ctrlAuth, tripsController.tripsUpdateTrip); // Protected route

module.exports = router;


