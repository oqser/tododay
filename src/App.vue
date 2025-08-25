<script setup lang="ts">
import Header from "./components/Header/Header.vue";
</script>

<template>
    <main class="main">
        <Header />

        <div class="content">
            <router-view />
        </div>
    </main>
</template>

<style scoped>
.main {
    height: 100%;
    display: flex;
    flex-direction: column;
}
.content {
    height: inherit;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>
