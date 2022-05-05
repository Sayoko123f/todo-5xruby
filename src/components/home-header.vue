<template>
    <header>
        <nav class="flex items-center justify-between md:px-8">
            <app-logo-vue />
            <div class="space-x-6">
                <span class="font-noto font-bold">{{ api.nickname }}</span>
                <button
                    class="font-noto hover:text-secondary"
                    @click="handleLogoutButtonClick"
                >
                    登出
                </button>
            </div>
        </nav>
    </header>
</template>
<script lang="ts" setup>
import appLogoVue from './app-logo.vue';
import { useAPI } from '../store/use-api';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';
const api = useAPI();
const router = useRouter();

onMounted(() => {
    if (!api.isLogin) {
        router.replace({ name: 'login' });
    }
});

function handleLogoutButtonClick() {
    api.logout()
        .then(() => {
            if (api.isLogin) {
                console.warn('logout error:(');
            } else {
                router.push({ name: 'login' });
            }
        })
        .catch((err) => {
            console.warn(err);
        });
}
</script>
