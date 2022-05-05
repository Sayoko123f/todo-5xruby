<template>
    <main class="flex h-screen flex-col bg-mybg md:flex-row">
        <div class="flex items-center justify-center md:w-1/2">
            <div class="">
                <div class="mt-12 text-center md:mt-0">
                    <app-logo-vue />
                </div>
                <div class="hidden md:block">
                    <img src="/img/pan1.png" alt="" />
                </div>
            </div>
        </div>
        <div class="flex items-center md:w-1/2">
            <slot></slot>
        </div>
    </main>
</template>
<script setup lang="ts">
import appLogoVue from './app-logo.vue';
import { useAPI } from '../store/use-api';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';
onMounted(() => {
    if (useAPI().isLogin) {
        useRouter().replace({ name: 'home' });
    }
});
</script>
