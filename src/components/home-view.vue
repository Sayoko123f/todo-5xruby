<template>
    <div
        class="relative z-0 h-screen [background:linear-gradient(172.7deg,_#FFD370_5.12%,_#FFD370_53.33%,_#FFD370_53.44%,_#FFFFFF_53.45%,_#FFFFFF_94.32%);]"
    >
        <home-header-vue />
        <main class="h-[calc(100vh-3rem)]">
            <todo-panel />
        </main>
        <!-- background image -->
        <div class="absolute inset-0 -z-50 flex items-center justify-center">
            <img src="/img/pan2.png" alt="" />
        </div>
    </div>
</template>
<script lang="ts" setup>
import homeHeaderVue from './home-header.vue';
import TodoPanel from './todo-panel.vue';
</script>
