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
app.use(express.urlencoded({extended: true}));

app.post('/api/users', async (req, res) => {
    try {
        const user = new User({username: req.body.username});

        //Save the user to MongoDB
        let savedUser = await user.save();
        res.json({
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
        const exercise = new Exercise({
            username:user.username, 
            description, duration, 
            date: dateValue 
        });

        let savedExercise = await exercise.save();
        res.json({
            _id: user._id,
            username: savedExercise.username,
            description: savedExercise.description,
            duration: savedExercise.duration,
            date: savedExercise.date,
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

app.get('/api/users/:_id/logs', async (req, res) => {
    const {from, to, limit} = req.query;

    const user = await User.findById(req.params._id);
    const query = { username: user.username }
    
    if(from) {
        query.date = { $gte: new Date(from) }
    }

    if(to) {
        if(query.date){
            query.date.$lt = new Date(to);
        } else {
            query.date = { $lt: new Date(to) }
        }
    }

    Exercise.find(query).limit(limit ? parseInt(limit) : 5).then((exercises) => {
        if(!exercises) {
            return res.status(404).send('No exercises found');
        }
        
        let returnData = {
            _id: user._id,
            username: user.username
        };
        
        if(query.date) {
            if(query.date.$gte) returnData.from = new Date(query.date.$gte).toDateString();
            if(query.date.$lt) returnData.to = new Date(query.date.$lt).toDateString();
        }
        
        let log = [];
        if(exercises.length > 0) {
            for(exercise of exercises) {
                let date = new Date(exercise.date);
                let exerciceLog = {
                    description: exercise.description,
                    duration: exercise.duration,
                    date: date.toDateString()
                };
                log.push(exerciceLog);
            }
        }
        returnData.count = exercises.length;
        returnData.log = log;
        res.json(returnData);
    }).catch(err => console.log(err));
})

app.listen(port, function() {
    console.log(`Listening on port ${port}`);
});