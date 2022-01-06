const Ticket = require('../models/ticket');
const Flight = require('../models/flight');

module.exports = {
    create,
    new: newTicket
}

function create(req, res) {
    req.body.flight = req.params.id;
    console.log(req.params.id + '<-- req.params.id');
    console.log(req.body.seat + '<-- req.body.seat');
    console.log(req.body.price + '<-- req.body.price');
    console.log(req.body.flight + '<-- req.body.flight');
    const ticket = new Ticket(req.body);
    ticket.save(function(err) {
        res.redirect(`/flights/${req.params.id}`);
    });
}

function newTicket(req, res) {
    const flightId = req.params.id;
    console.log(flightId + '<-- flightId');
    res.render('tickets/new', { title: 'Add Ticket', flightId });
}