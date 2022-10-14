<script setup lang="ts">
    import session, { login, logout } from '../stores/session'
</script>

<template>
    <div class="buttons" v-if="session.user == null">
        <a class="button">
            Sign up
        </a>
        <a class="button" @click="login('Jason', 'Caccamo')">
            Log in
        </a>
    </div>
    <div class="welcome" v-else>
        <p>Welcome {{session.user.firstName}} {{session.user.lastName}}</p>
        <a class="button" @click="logout()">
            Log out
        </a>
    </div>
</template>

<style lang="scss">
    .welcome {
        display: flex;
        p {
            margin: auto;
        }
        a {
            margin-left: 10px;
        }
    }
</style>
