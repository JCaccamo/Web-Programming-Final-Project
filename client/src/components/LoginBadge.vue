<script setup lang="ts">
    import session, { login, logout } from '../stores/session'
</script>

<template>
    <div class="buttons" v-if="session.user == null">
        <a class="button is-info">
            Sign Up
        </a>
        <div class="navbar-item has-dropdown is-hoverable">
            <a class="button is-light">
                Log In
            </a>
            <div class="navbar-dropdown">
                <a class="navbar-item" @click="login('Jason', 'Caccamo')">
                    Jason Caccamo
                </a>
                <a class="navbar-item" @click="login('Moshe', 'Plotkin')">
                    Moshe Plotkin
                </a>
                <a class="navbar-item" @click="login('Dwayne', 'Johnson')">
                    Dwayne Johnson
                </a>
            </div>
        </div>
    </div>
    <div class="welcome" v-else>
        <h1>Welcome {{session.user.firstName}} {{session.user.lastName}}</h1>
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
