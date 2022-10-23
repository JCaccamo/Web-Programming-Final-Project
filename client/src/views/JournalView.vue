<script lang="ts">
    import { ref } from 'vue';
    import { uid } from 'uid';
    
    export default {
        name: "create",
        setup() {
            // Create data
            const workoutName = ref("");
            const workoutType = ref("select-workout");
            const exercises: any = ref([1]);
            const errorMsg: any = ref(null);
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
            const deleteExercise = (id: any) => {
                if (exercises.value.length > 1) {
                    exercises.value = exercises.value.filter((exercise: any) => exercise.id !== id);
                    return;
                }
                errorMsg.value = "Error: You must have at least one exercise";
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
            return { workoutName, workoutType, exercises, errorMsg, addExercise, deleteExercise, workoutChange };
        }
    }
</script>

<template>
    <div class="section">
        <div class="container">
            <h1 class="title">Journal</h1>
            <h2 class="subtitle">Page for adding/editing workouts</h2>
            <!-- Error Message-->
            <div v-if="errorMsg">
                <p class="notification is-danger is-light mb-5">{{errorMsg}}</p>
            </div>
            <!-- Form -->
            <form>
                <h1 class="title is-5">Record workout</h1>
                <div class="columns">
                    <div class="column">
                        <!-- Workout Name -->
                        <div class="field">
                            <label class="label" for="workout-name">Workout Name</label>
                            <div class="control">
                                <input class="input" type="text" required id="workout-name" v-model="workoutName">
                            </div>
                        </div>
                    </div>
                    <div class="column">
                        <!-- Workout Type -->
                        <div class="field">
                            <label class="label" for="workout-type">Workout Type</label>
                            <div class="control">
                                <div class="select is-fullwidth">
                                    <select id="workout-type" required @change="workoutChange" v-model="workoutType">
                                        <option value="select-workout">Select Workout</option>
                                        <option value="strength">Strength Training</option>
                                        <option value="cardio">Cardio</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div><!-- end of columns -->
                <!-- Strength Training Inputs -->
                <div v-if="workoutType === 'strength'">
                    <div v-for="(item, index) in exercises" :key="index">
                        <div class="columns">
                            <div class="column">
                                <div class="field">
                                    <label class="label" for="exercise-name">Exercise</label>
                                    <div class="control">
                                        <input class="input" required type="text" v-model="item.exercise">
                                    </div>
                                </div>
                            </div>
                            <div class="column">
                                <div class="field">
                                    <label class="label" for="sets">Sets</label>
                                    <div class="control">
                                        <input class="input" required type="text" v-model="item.sets">
                                    </div>
                                </div>
                            </div>
                            <div class="column">
                                <div class="field">
                                    <label class="label" for="reps">Reps</label>
                                    <div class="control">
                                        <input class="input" required type="text" v-model="item.reps">
                                    </div>
                                </div>
                            </div>
                            <div class="column">
                                <div class="field">
                                    <label class="label" for="weight">Weight (lbs)</label>
                                    <div class="control">
                                        <input class="input" required type="text" v-model="item.weight">
                                    </div>
                                </div>
                            </div>
                        </div><!-- end of columns -->
                        <div class="columns mb-5">
                            <div class="column is-one-quarter">
                                <div class="field">
                                    <div class="control">
                                        <button class="button is-info is-light" type="button" @click="addExercise">
                                            Add Exercise
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="column is-one-quarter">
                                <div class="field">
                                    <div class="control">
                                        <button class="button is-danger is-light" type="button" @click="deleteExercise(item.id)">
                                            Delete Exercise
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div><!-- end of columns -->
                    </div><!-- end of v-for -->
                </div><!-- end of v-if -->
                <!-- Cardio Inputs -->
                <div v-if="workoutType === 'cardio'">
                    <div v-for="(item, index) in exercises" :key="index">
                        <div class="columns">
                            <div class="column">
                                <div class="field">
                                    <label class="label" for="cardio-type">Type</label>
                                    <div class="select is-fullwidth">
                                        <select id="cardio-type" v-model="item.cardioType">
                                            <option value="run">Run</option>
                                            <option value="walk">Walk</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="column">
                                <div class="field">
                                    <label class="label" for="distance">Distance (mi)</label>
                                    <div class="control">
                                        <input class="input" required type="text" v-model="item.distance">
                                    </div>
                                </div>
                            </div>
                            <div class="column">
                                <div class="field">
                                    <label class="label" for="duration">Duration (min)</label>
                                    <div class="control">
                                        <input class="input" required type="text" v-model="item.duration">
                                    </div>
                                </div>
                            </div>
                            <div class="column">
                                <div class="field">
                                    <label class="label" for="pace">Pace (mph)</label>
                                    <div class="control">
                                        <input class="input" required type="text" v-model="item.pace">
                                    </div>
                                </div>
                            </div>
                        </div><!-- end of columns -->
                        <div class="columns mb-5">
                            <div class="column is-one-quarter">
                                <div class="field">
                                    <div class="control">
                                        <button class="button is-info is-light" type="button" @click="addExercise">
                                            Add Exercise
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="column is-one-quarter">
                                <div class="field">
                                    <div class="control">
                                        <button class="button is-danger is-light" type="button" @click="deleteExercise(item.id)">
                                            Delete Exercise
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div><!-- end of columns -->
                    </div><!-- end of v-for -->
                </div><!-- end of v-if -->
                <div class="field">
                    <div class="control">
                        <button class="button is-info" type="submit">
                            Record Workout
                        </button>
                    </div>
                </div>
            </form>
        </div><!-- end of container -->
    </div><!-- end of section -->
</template>

<style lang="scss">
    img:hover {
        cursor: pointer;
    }
</style>
