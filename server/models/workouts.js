const { getUser } = require('./users');
const list = [];
const { connect } = require('./mongo');

const COLLECTION_NAME = 'workouts';

async function collection(){
    const client = await connect();
    return client.db('collection').collection(COLLECTION_NAME);
}

const get = async (userId) => {
    const db = await collection();
    const data = await db.find({ userId }).toArray();
    return await Promise.all( data.map(async (exercise) => ({
        ...exercise, 
        user: await getUser(exercise.userId)
    })));
};

/**
 * 
 * @param {string} userId 
 * @param {string} workoutId 
 * @param {number} quantity 
 * @returns 
 */
const add = async (userId, workoutId, quantity) => {
    const db = await collection();
    let exercise = await db.findOne({ userId, workoutId})
    if (exercise) {
        exercise.quantity += quantity;
        db.updateOne({ userId, workoutId }, { $set: exercise })
    } else {
        exercise = { id: list.length + 1, quantity, workoutId, userId };
        await db.insertOne(exercise)
    }
    return { ...exercise, user: await getUser(userId) };
};

/**
 * 
 * @param {string} userId 
 * @param {string} workoutId 
 * @param {number} quantity 
 * @returns 
 */
const update = async (userId, workoutId, quantity) => {
    const db = await collection();
    console.log(userId, workoutId, quantity);
    if(quantity === 0) {
        db.deleteOne({ userId, workoutId})
        return "null";
    } else {
        let exercise = await db.findOne({ userId, workoutId})
        exercise.quantity = quantity;
        db.updateOne({ userId, workoutId }, { $set: exercise })
        return { ...exercise, user: await getUser(userId) };
    }
}

module.exports = { add, get, update }
