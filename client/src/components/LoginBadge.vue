<script setup lang="ts">
    import { RouterLink } from 'vue-router';
    import session, { login, logout } from '../stores/session'
</script>

<template>
    <div class="buttons" v-if="session.user == null">
        <a class="button is-info">
            Sign Up
        </a>
        <div class="navbar-item has-dropdown is-hoverable">
            <RouterLink class="button is-light" to="login">
                Log In
            </RouterLink>
        </div>
    </div>
    <div class="welcome" v-else>
        <h1>Welcome {{session.user.email}}</h1>
        <a class="button is-light" @click="logout()">
            Log out
        </a>
    </div>
</template>

<style lang="scss">
    .welcome {
        display: flex;
        h1 {
            margin: auto;
        }
        a {
            margin-left: 10px;
        }
    }
</style>
