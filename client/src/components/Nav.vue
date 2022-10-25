<script setup lang="ts">
    import { ref } from 'vue';
    import LoginBadge from './LoginBadge.vue';
    let isActive = ref(false);
</script>

<template>
    <nav class="navbar is-info" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <div class="navbar-item">
                <h1 class="title is-4">Exercise App</h1>
            </div>
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
                <router-link to="/activity" class="navbar-item">
                    Activity
                </router-link>
                <router-link to="/social" class="navbar-item">
                    Social
                </router-link>
                <router-link to="/stats" class="navbar-item">
                    Stats
                </router-link>
                <router-link to="/admin" class="navbar-item">
                    Admin
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
            margin-left: 80px;
            margin-right: 20px;
        }
        .navbar-item {
            margin-left: 5px;
            margin-right: 5px;
        }
        .navbar-end {
            margin-left: 20px;
            margin-right: 80px;
        }
    }
    .router-link-active {
        border-bottom: #0050aa 5px solid;
    }
</style>
