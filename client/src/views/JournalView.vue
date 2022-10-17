<script>
    import { ref } from 'vue';
    import { uid } from 'uid';
    
    export default {
        name: "create",
        setup() {
            // Create data
            const workoutName = ref("");
            const workoutType = ref("select-workout");
            const exercises = ref([1]);
            const statusMsg = ref(null);
            const errorMsg = ref(null);
            // Add exercise
            const addExercise = () => {
                if (workoutType.value === 'strength') {
                    exercises.value.push({
                        id: uid(),
                        exercise: "",
                        sets: "",
                        reps: "",
                        weight: "",
                    });
                    return
                }
                exercises.value.push({
                    id: uid(),
                    cardioType: "",
                    distance: "",
                    duration: "",
                    pace: "",
                })
            }
            // Delete exercise
            const deleteExercise = (id) => {
                if (exercises.value.length > 1) {
                    exercises.value = exercises.value.filter((exercise) => exercise.id !== id);
                    return;
                }
                errorMsg.value = "Error: Cannot remove, need to have at least one exercise";
                setTimeout(() => {
                    errorMsg.value = false;
                }, 5000);
            }
            // Listens for changing of workout type input
            const workoutChange = () => {
                exercises.value = [];
                addExercise()
            }
            // Create workout
            return { workoutName, workoutType, exercises, statusMsg, errorMsg, addExercise, deleteExercise, workoutChange };
        }
    }
</script>

<template>
    <div class="section">
        <div class="container">
            <h1 class="title">Journal</h1>
            <h2 class="subtitle">Page for adding/editing workouts</h2>
            <!-- Status Message-->
            <div v-if="statusMsg || errorMsg">
                <p>{{statusMsg}}</p>
                <p>{{errorMsg}}</p>
            </div>
            <!-- Create -->
            <div>
                <!-- Form -->
                <form>
                    <h1>Record workout</h1>
                    <!-- Workout Name -->
                    <div>
                        <label for="workout-name">Workout Name</label>
                        <input type="text" required id="workout-name" v-model="workoutName">
                    </div>
                    <!-- Workout Type -->
                    <div>
                        <label for="workout-type">Workout Type</label>
                        <select id="workout-type" required @change="workoutChange" v-model="workoutType">
                            <option value="select-workout">Select Workout</option>
                            <option value="strength">Strength Training</option>
                            <option value="cardio">Cardio</option>
                        </select>
                    </div>
                    <!-- Strength Training Inputs -->
                    <div v-if="workoutType === 'strength'">
                        <div v-for="(item, index) in exercises" :key="index">
                            <div>
                                <label for="exercise-name">Exercise</label>
                                <input required type="text" v-model="item.exercise">
                            </div>
                            <div>
                                <label for="sets">Sets</label>
                                <input required type="text" v-model="item.sets">
                            </div>
                            <div>
                                <label for="reps">Reps</label>
                                <input required type="text" v-model="item.reps">
                            </div>
                            <div>
                                <label for="weight">Weight (lbs)</label>
                                <input required type="text" v-model="item.weight">
                            </div>
                                <img src="@/assets/trash-icon.png" alt="" @click="deleteExercise(item.id)">
                            </div>
                        <button type="button" @click="addExercise">
                            Add Exercise
                        </button>
                    </div>
                    <!-- Cardio Inputs -->
                    <div v-if="workoutType === 'cardio'">
                        <div v-for="(item, index) in exercises" :key="index">
                            <div>
                                <label for="cardio-type">Type</label>
                                <select id="cardio-type" v-model="item.cardioType">
                                    <option value="#">Select Type</option>
                                    <option value="run">Run</option>
                                    <option value="walk">Walk</option>
                                </select>
                            </div>
                            <div>
                                <label for="distance">Distance</label>
                                <input required type="text" v-model="item.distance">
                            </div>
                            <div>
                                <label for="duration">Duration</label>
                                <input required type="text" v-model="item.duration">
                            </div>
                            <div>
                                <label for="pace">Pace (mph)</label>
                                <input required type="text" v-model="item.pace">
                            </div>
                                <img src="@/assets/trash-icon.png" alt="" @click="deleteExercise(item.id)">
                            </div>
                            <button type="button" @click="addExercise">
                            Add Exercise
                            </button>
                        </div>
                    <button type="submit">
                        Record Workout
                    </button>
                </form><!-- end of form -->
            </div><!-- end of create -->
        </div><!-- end of container div -->
    </div><!-- end of section div -->
</template>

<style lang="scss">

</style>
