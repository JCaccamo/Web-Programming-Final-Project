<script setup lang="ts">
    import { ref } from 'vue';
    import LoginBadge from './LoginBadge.vue';
    let isActive = ref(false);
</script>

<template>
    <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <a class="navbar-item">
                <h1 class="title is-4">Exercise App</h1>
            </a>
            <!-- menu for mobile devices -->
            <a :class="{ 'is-active': isActive }" @click="isActive = !isActive" role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div><!-- end of navbar-brand -->
        <div id="navbarBasicExample" class="navbar-menu" :class="{ 'is-active': isActive }">
            <div class="navbar-start">
                <router-link to="/" class="navbar-item">
                    Home
                </router-link>
                <router-link to="/journal" class="navbar-item">
                    Journal
                </router-link>
                <router-link to="/about" class="navbar-item">
                    About
                </router-link>
            </div><!-- end of navbar-start -->
            <div class="navbar-end">
                <div class="navbar-item">
                    <LoginBadge></LoginBadge>
                </div>
            </div><!-- end of navbar-end -->
        </div><!-- end of navbar-menu -->
    </nav><!-- end of navbar -->
</template>

<style lang="scss">
    nav {
        box-shadow: 0px 1px 2px rgb(205, 205, 205);
        .navbar-brand {
            padding-left: 20px;
            padding-right: 20px;
        }
    }
    .router-link-active {
        border-bottom: #00AA00 4px solid;
    }
</style>
