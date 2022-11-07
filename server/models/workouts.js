const data = require('../data/data.json');

function getWorkouts() {
    return data.workouts;
}

function getWorkout(id) {
    return data.workouts.find(p => p.workouts === workouts);
}

module.exports = {
    getWorkouts,
    getWorkout
};
