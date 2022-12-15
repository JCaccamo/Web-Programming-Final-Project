<script setup lang="ts">
  import { reactive } from "vue";
  import { getWorkouts, type Workout } from "../stores/workouts";
  const workouts = reactive([] as Workout[]);
  getWorkouts().then( x=> workouts.push(...x.workouts));
</script>

<template>
  <div class="section">
    <h1 class="title">Social</h1>
    <h2 class="subtitle">Page for listing workouts that the current user's friends did recently</h2>
    <div class="view" v-for="w in workouts">
      <div>
        <span>Workout Name: {{w.workoutName}}<br></span>
        <span>Workout Type: {{w.workoutType}}<br></span>
        <span v-if="w.workoutType == 'Strength Training'">
          Exercise: {{w.exercise}}<br>
          Sets: {{w.sets}} set(s)<br>
          Reps: {{w.reps}} rep(s)<br>
          Weight: {{w.weight}} lbs<br>
        </span>
        <span v-else>
          Type: {{w.type}}<br>
          Distance: {{w.distance}} mile(s)<br>
          Duration: {{w.duration}} minute(s)<br>
          Pace: {{w.pace}} mph<br>
        </span>
      </div><br>
    </div>
  </div>
</template>

<style lang="scss">
  .view {
    div {
      border: 2px solid whitesmoke;
      border-radius: 5px;
      padding: 20px;
      width: 25%;
      transition: 0.5s;
    }
    div:hover {
      cursor: pointer;
      box-shadow: 2px 2px 0px whitesmoke;
      margin: -5px 0px 0px -5px;
    }
  }
</style>
