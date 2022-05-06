<template>
    <header class="h-12">
        <nav
            class="flex flex-col items-center justify-between md:flex-row md:px-8"
        >
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
        <Teleport to="#portal-target">
            <OverlayScreen :loading="true" v-if="showOverlay" />
        </Teleport>
    </header>
</template>
<script lang="ts" setup>
import appLogoVue from './app-logo.vue';
import { useAPI } from '../store/use-api';
import { useRouter } from 'vue-router';
import OverlayScreen from './overlay-screen.vue';
import { onMounted, ref } from 'vue';
const api = useAPI();
const router = useRouter();
const showOverlay = ref(false);

onMounted(() => {
    if (!api.isLogin) {
        router.replace({ name: 'login' });
    }
});

function handleLogoutButtonClick() {
    showOverlay.value = true;
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
        })
        .finally(() => {
            showOverlay.value = false;
        });
}
</script>
