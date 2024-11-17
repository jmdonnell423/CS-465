const fs = require('fs');
const path = require('path');

let trips = [];
try {
    trips = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/trips.json'), 'utf8'));
} catch (error) {
    console.error('Error reading trips.json:', error);
}

const travel = (req, res) => {
    res.render('travel', {
        title: 'Travlr Getaways',
        trips
    });
};

module.exports = {
    travel
};

