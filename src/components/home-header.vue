<template>
    <header>
        <nav class="flex justify-between md:px-8 items-center">
            <app-logo-vue />
            <div class="space-x-6">
                <span class="font-bold font-noto">王小明的代辦</span>
                <button class="font-noto hover:text-secondary">登出</button>
            </div>
        </nav>
    </header>
</template>
<script lang="ts" setup>
import appLogoVue from './app-logo.vue';
</script>
