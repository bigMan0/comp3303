const express = require('express')
const mongoose = require('mongoose')
const Calendar = require('./models/calendarModel.js')
const app = express()
var cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Define some test routes
app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1><h2>From the NODE.js API<h2>')
})

app.get('/blurg', (req, res) => {
    res.send('<h1>Hello Blurg and Welcome to COMP-3033!</h1>')
})

// return all contacts
app.get('/calendar', async(req, res) => {
    try {
        const cal = await Calendar.find({});
        res.status(200).json(cal);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// return a contact by id
app.get('/calendar/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const cal = await Calendar.findById(id);
        res.status(200).json(cal);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//create a contact
app.post('/calendar', async(req, res) => { // async and await when we don't know when they will come back
    try {
        const cal = await Calendar.create(req.body)
        res.status(200).json(cal);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

// update a contact
app.put('/calendar/:id', async(req, res) => {
    try {
        const {id} = req.params; // use the id that was generated by mongodb
        const cal = await Calendar.findByIdAndUpdate(id, req.body);
        // we cannot find any contact in database
        if(!cal){
            return res.status(404).json({message: `cannot find any contact with ID ${id}`})
        }
        const updatedContact = await Calendar.findById(id);
        res.status(200).json(updatedCalendar);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// delete a contact
app.delete('/calendar/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const cal = await Calendar.findByIdAndDelete(id);
        if(!cal){
            return res.status(404).json({message: `cannot find any contact with ID ${id}`})
        }
        res.status(200).json(cal);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// database connection: doesn't matter if it's at the top or bottom
mongoose.set("strictQuery", false) // client to mongo
mongoose.connect('mongodb+srv://kydeviller:eH0oOYkD2oGoPY5s@calendar.5makn07.mongodb.net/calendar?retryWrites=true&w=majority')
.then(() => {
    console.log('connected to MongoDB Atlas')
    app.listen(3001, ()=> {
        console.log('Node API app (with CORS)is now running on port 3001')
    });
}).catch((error) => {
    console.log(error)
})