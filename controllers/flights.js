const Flight = require('../models/flight');

module.exports = {
    index,
    show,
    new: newFlight,
    create
};

function index(req, res) {

    Flight.find({}, function(err, flightDocuments) {

        res.render('flights/index', {
            title: 'All Flights',
            flights: flightDocuments
        })
    })
}

function show(req, res) {
    Flight.findById(req.params.id, function(err, flight) {
        res.render('flights/show', { title: 'Flight Detail', flight });
    });
}

function newFlight(req, res) {
    const newFlight = new Flight();
    // Obtain the default date
    const dt = newFlight.departs;
    // Format the date for the value attribute of the input
    const departsDate = dt.toISOString().slice(0, 16);
    res.render('flights/new', { title: 'Add Flight', departsDate });
}

function create(req, res) {
    if (req.body.cast) req.body.cast = req.body.cast.split(',');
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key];
    }
    const flight = new Flight(req.body);
    flight.save(function(err) {
        if (err) return res.render('flights/new');
        console.log(flight);
        res.redirect('/flights');
    });
}