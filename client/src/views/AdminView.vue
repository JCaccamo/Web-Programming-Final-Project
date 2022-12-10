<script setup lang="ts">
  import { computed, reactive, ref, watch } from "vue";
  import { RouterLink } from "vue-router";
  import { isLoading } from "@/stores/session";
  import { getUsers, type User } from "../stores/users";
  import session from '../stores/session.js';
  const users = reactive([] as User[]);
  getUsers().then( x=> users.push(...x.users));
  session.user = { firstName:"Jason", lastName:"Caccamo", email:"caccamoj1@newpaltz.edu" }; // Admin is Jason Caccamo
  function removeUser( name:String ) {
    let index = 0;
    for (let i = 0; i < users.length; i++) {
      if (name === users[i].lastName) {
        index = i;
        break;
      }
    }
    users.splice(index, 1);
  }
</script>

<template>
  <div class="section">
    <h1 class="title">Admin Page</h1>
    <p class="subtitle">Page for listing and editing users</p>
    <h1>Click to remove a user:</h1><br>
    <div class="remove" v-for="u in users" @click="removeUser(u.lastName)">
      <p>{{u.firstName}} {{u.lastName}}</p><br>
    </div>
  </div>
</template>

<style lang="scss">
  .remove {
    p {
      border: 2px solid whitesmoke;
      border-radius: 5px;
      padding: 20px;
      width: 25%;
      text-align: center;
      transition: 0.5s;
    }
    p:hover {
      cursor: pointer;
      box-shadow: 2px 2px 0px whitesmoke;
      margin: -5px 0px 0px -5px;
    }
  }
</style>
