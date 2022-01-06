const Flight = require('../models/flight');

module.exports = {
    index,
    new: newFlight,
    create
};

function index(req, res) {

    Flight.find({}, function(err, flightDocuments) {

        res.render('flights/index', {
            flights: flightDocuments
        })
    })
}


function newFlight(req, res) {
    const newFlight = new Flight();
    // Obtain the default date
    const dt = newFlight.departs;
    // Format the date for the value attribute of the input
    const departsDate = dt.toISOString().slice(0, 16);
    res.render('flights/new', { departsDate });
}

function create(req, res) {
    // split if it's not an empty string
    if (req.body.cast) req.body.cast = req.body.cast.split(',');
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key];
    }
    const flight = new Flight(req.body);
    flight.save(function(err) {
        // one way to handle errors
        if (err) return res.render('flights/new');
        console.log(flight);
        // for now, redirect right back to new.ejs
        res.redirect('/flights');
    });
}