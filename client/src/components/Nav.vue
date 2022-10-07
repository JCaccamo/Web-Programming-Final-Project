<script setup lang="ts">
    import { ref } from 'vue';
    let isActive = ref(false);
</script>

<template>
    <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <a class="navbar-item">
                <h1 class="title is-4">Exercise App</h1>
            </a>
            <!-- Menu for mobile devices -->
            <a :class="{ 'is-active': isActive }" @click="isActive = !isActive" role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>
        <div id="navbarBasicExample" class="navbar-menu" :class="{ 'is-active': isActive }">
            <div class="navbar-start">
                <a class="navbar-item">
                    Home
                </a>
                <a class="navbar-item">
                    Journal
                </a>
            </div>
            <div class="navbar-end">
                <div class="navbar-item">
                    <div class="buttons">
                        <a class="button is-white">
                            Sign Up
                        </a>
                        <a class="button is-white">
                            Log In
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<style lang="scss">
    nav {
        box-shadow: 0px 1px 2px rgb(205, 205, 205);
        .navbar-brand {
            padding-left: 20px;
            padding-right: 20px;
        }
    }
</style>
