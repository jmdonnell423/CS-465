const express = require('express');
const router = express.Router();


//This is where we import the controllers we will route
const tripsController = require('../controllers/trips');


router
    .route('/trips')
    .get(tripsController.tripList)
    .post(tripsController.tripsAddTrip);

router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode);


module.exports = router;
