<template>
    <div class="relative mt-12 w-full max-w-[500px]">
        <input
            class="font-input h-[47px] w-full rounded-[0.625rem] pr-16 pl-4 font-noto shadow-lg outline-none"
            type="text"
            placeholder="新增待辦事項"
            v-model="input"
            @keydown.enter="handleCreateButtonClick"
        />
        <button
            class="absolute top-1 right-1 h-[2.4375rem] w-10 rounded-[0.625rem] bg-[#333333]"
            @click="handleCreateButtonClick"
        >
            <svg
                class="mx-auto"
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M18.6364 8.93184H11.8182V2.11364C11.8182 1.36091 11.2073 0.75 10.4545 0.75H9.54548C8.79275 0.75 8.18184 1.36091 8.18184 2.11364V8.93184H1.36364C0.610908 8.93184 0 9.54275 0 10.2955V11.2045C0 11.9573 0.610908 12.5682 1.36364 12.5682H8.18184V19.3864C8.18184 20.1391 8.79275 20.75 9.54548 20.75H10.4545C11.2073 20.75 11.8182 20.1391 11.8182 19.3864V12.5682H18.6364C19.3891 12.5682 20 11.9573 20 11.2045V10.2955C20 9.54275 19.3891 8.93184 18.6364 8.93184Z"
                    fill="white"
                />
            </svg>
        </button>
        <Teleport to="#portal-target">
            <OverlayScreen :loading="true" v-if="showOverlay" />
        </Teleport>
    </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';
import { useAPI } from '../store/use-api';
import OverlayScreen from './overlay-screen.vue';
const api = useAPI();
const input = ref('');
const showOverlay = ref(false);
const inputFilter = computed(() => {
    return input.value.trim();
});

function handleCreateButtonClick() {
    showOverlay.value = true;
    api.createTodo(inputFilter.value)
        .then(async () => {
            await api.fetchTodolist();
            input.value = '';
        })
        .catch((err) => {
            console.warn(err);
            window.alert('新增 Todo 失敗，請嘗試重新整理網頁或稍後再試。ˋ');
        })
        .finally(() => {
            showOverlay.value = false;
        });
}
</script>
