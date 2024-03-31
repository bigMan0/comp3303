const mongoose = require('mongoose')

const calendarSchema = mongoose.Schema(
    { // the _id will generate itself in mongodb
        title: { // title of the event
            type: String,
            required: [true, "Please enter a event title"]
        },
        date: { // date that the event is on and wil be displayed
            type: Date,
            required: [true, "Please enter a date"]
        },
        type: { // type of event, task or reminder
            type: String,
            required: true,
            default: "NULL"
        },
    }
)

// calendar is the database, cal is the file/table that is being used
const Calendar = mongoose.model('calendar', calendarSchema, 'cal');
module.exports = Calendar;
