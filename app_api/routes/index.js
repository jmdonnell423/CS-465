const express = require('express');
const router = express.Router();
const tripsController = require('../controllers/trips');
const authMiddleware = require('../middleware/auth'); // Middleware to validate token

// Authentication routes
router
    .route('/login')
    .post(require('../controllers/authentication').login);

router
    .route('/register')
    .post(require('../controllers/authentication').register);

// Trips routes
router
    .route('/trips')
    .get(tripsController.tripsList) // Public route
    .post(authMiddleware, tripsController.tripsAddTrip); // Protected route

router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode) // Public route
    .put(authMiddleware, tripsController.tripsUpdateTrip); // Protected route

module.exports = router;


