<script setup lang="ts">
    import { ref } from 'vue';
    import { login } from '@/stores/session';

    const email = ref('');
    const password = ref('');
</script>

<template>
    <div class="section">
        <form class="box" @submit.prevent="login(email, password)">
            <div class="field">
                <label class="label">Email</label>
                <div class="control">
                <input class="input" type="email" placeholder="e.g. alex@example.com" v-model="email">
                </div>
            </div>
            <div class="field">
                <label class="label">Password</label>
                <div class="control">
                <input class="input" type="password" placeholder="Password" v-model="password">
                </div>
            </div>
            <button class="button is-info">Sign in</button>
        </form>
    </div>
</template>

<style scoped>

</style>
