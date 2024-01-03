require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const User = require('./schema/User');
const Exercise = require('./schema/Exercise');

const port = process.env.PORT || 3000;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

//DB connection
mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.ybtikl4.mongodb.net/users?retryWrites=true&w=majority`)
.then(() => console.log('Connection established...'))
.catch((err) => console.log(err));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.post('/api/users', async (req, res) => {
    try {
        const user = new User({username: req.body.username});

        //Save the user to MongoDB
        let savedUser = await user.save();
        res.status(201).json({
            _id: savedUser._id,
            username: savedUser.username,
        })  
    } catch(error) {
        console.log(error);
        res.status(500).send("Error creating a new user");
    }
});

app.post('/api/users/:id/exercises', async(req, res) => {
    try{
        const { description, duration, date} = req.body;
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).send("Invalid user");
        const today = new Date();
        const dateValue = date ? date : today.toDateString();
        const exercise = new Exercise({username:user.username, description, duration, date: dateValue });
        let savedExercise = await exercise.save();
        res.json({
            _id: savedExercise._id,
            username: savedExercise.username,
            date: savedExercise.date,
            duration: savedExercise.duration,
            description: savedExercise.description,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
})

app.get('/api/users', (req, res) => {
    User.find()
    .then(data => res.json(data))
    .catch(err => res.json([]));
})

app.listen(port, function() {
    console.log(`Listening on port ${port}`);
});