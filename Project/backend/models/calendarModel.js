const mongoose = require('mongoose')

const contactSchema = mongoose.Schema(
    { // the _id will do it itself in mongodb
        title: {
            type: String,
            required: [true, "Please enter a event title"]
        },
        date: {
            type: Date,
            required: [true, "Please enter a date"]
        },
        type: {
            type: String,
            required: true,
            default: "NULL"
        },
    }
)

// Node-Api is the database, My_contacts is the file
const Calendar = mongoose.model('calendar', contactSchema, 'cal');
module.exports = Calendar;
