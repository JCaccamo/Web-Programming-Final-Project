const data = require('../data/workouts.json');
const { connect } = require('./mongo');
const { ObjectId } = require('mongodb');

const COLLECTION_NAME = 'workouts';

async function collection(){
    const client = await connect();
    return client.db('collection').collection(COLLECTION_NAME);
}

async function getWorkouts() {
    const db = await collection();
    const data = await db.find().toArray()
    return { total: data.length, limit: data.length, workouts: data };
}

async function getWorkout(id) {
    const db = await collection();
    const data = await db.findOne({ _id: new ObjectId(id) })
    return data;
}

async function addWorkout(workout){
    const db = await collection();
    const result = await db.insertOne(workout)
    return workout;
}

async function updateWorkout(id, workout){
    const db = await collection();
    delete workout._id; // You can not change the _id. So it can not be part of the changes that you send to the database.
    const result = await db.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: workout },
        { returnDocument: 'after' })
    return result.value;
}

async function deleteWorkout(id){
    const db = await collection();
    const result = await db.deleteOne({ _id: new ObjectId(id) })
    return result;
}

async function seed(){
    const db = await collection();
    db.insertMany(data.workouts);
    return 'success';
}

module.exports = {
    COLLECTION_NAME,
    collection,
    getWorkouts,
    getWorkout,
    addWorkout,
    updateWorkout,
    deleteWorkout,
    seed,
};
