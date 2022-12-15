const express = require('express');
const workouts = require('../models/workouts');

const app = express.Router();

app
    .get('/', (req, res, next) => {
        workouts.getWorkouts()
        .then(x=> res.status(200).send(x))
        .catch(next);
    })
    .get('/:id', (req, res, next) => {
        workouts.getWorkouts(req.params.id)
        .then(workout=> {
            if (workout) {
                res.status(200).send(workout);
            } else {
                res.status(404).send('Workout not found');
            }            
        })
        .catch(next);
    })
    .post('/', (req, res, next) => {
        workouts.addWorkout(req.body)
        .then(x=> res.status(200).send(x))
        .catch(next);
    })
    .patch('/:id', (req, res, next) => {
        workouts.updateWorkout(req.params.id, req.body)
        .then(x=> res.status(200).send(x))
        .catch(next);
    })
    .delete('/:id', (req, res, next) => {
        workouts.deleteWorkout(req.params.id)
        .then(x=> res.status(200).send(x))
        .catch(next);
    })
    .post('/seed', (req, res, next) => {
        workouts.seed()
        .then(x=> res.status(200).send(x))
        .catch(next);
    });

module.exports = app;
