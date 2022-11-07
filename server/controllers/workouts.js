const express = require('express');
const workouts = require('../models/workouts');

const app = express.Router();

app
    .get('/', (req, res) => {
        res.status(200).send(users.getWorkouts());
    })
    .get('/:id', (req, res) => {
        const workout = workouts.getWorkout(+req.params.workouts);
        if (workout) {
            res.status(200).send(workout);
        } else {
            res.status(404).send('Workout not found')
        }
    })

module.exports = app;
