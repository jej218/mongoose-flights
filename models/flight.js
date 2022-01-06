const mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

const destinationSchema = new Schema({
    airport: {
        type: String,
        enum: ['ATL', 'DFW', 'DEN', 'LAX', 'SAN']
    },
    arrival: Date
});

const flightSchema = new Schema({
    airline: {
        type: String,
        enum: ['American', 'Delta', 'Southwest', 'United']
    },
    airport: {
        type: String,
        enum: ['ATL', 'DFW', 'DEN', 'LAX', 'SAN'],
        default: 'DEN'
    },
    flightNo: {
        type: Number,
        required: true,
        min: 11,
        max: 9998
    },
    departs: {
        type: Date,
        default: function() {
            let d = new Date();
            d.setFullYear(d.getFullYear() + 1);
            return d;
        }
    },
    destinations: [destinationSchema]
});


module.exports = mongoose.model('Flight', flightSchema);