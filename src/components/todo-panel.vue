<template>
    <div class="flex flex-col items-center justify-center">
        <TodoCreate />
        <p class="mt-8 text-center font-noto" v-if="!api.todolist.length">
            目前尚無待辦事項
        </p>
        <div
            class="mt-4 w-full max-w-[500px] rounded-[0.625rem] bg-white shadow-lg"
            v-if="api.todolist.length"
        >
            <div class="grid grid-cols-3 text-center font-noto font-bold">
                <div
                    class="cursor-pointer border-b-2 py-4 hover:border-[#333333] hover:text-[#333333]"
                    :class="[
                        selectedViewType === 'all'
                            ? 'border-[#333333]'
                            : 'border-[#EFEFEF]',
                        selectedViewType === 'all'
                            ? 'text-[#333333]'
                            : 'text-[#9F9A91]',
                    ]"
                    @click="() => (selectedViewType = 'all')"
                >
                    全部
                </div>
                <div
                    class="cursor-pointer border-b-2 py-4 hover:border-[#333333] hover:text-[#333333]"
                    :class="[
                        selectedViewType === 'undone'
                            ? 'border-[#333333]'
                            : 'border-[#EFEFEF]',
                        selectedViewType === 'undone'
                            ? 'text-[#333333]'
                            : 'text-[#9F9A91]',
                    ]"
                    @click="() => (selectedViewType = 'undone')"
                >
                    待完成
                </div>
                <div
                    class="cursor-pointer border-b-2 py-4 hover:border-[#333333] hover:text-[#333333]"
                    :class="[
                        selectedViewType === 'done'
                            ? 'border-[#333333]'
                            : 'border-[#EFEFEF]',
                        selectedViewType === 'done'
                            ? 'text-[#333333]'
                            : 'text-[#9F9A91]',
                    ]"
                    @click="() => (selectedViewType = 'done')"
                >
                    已完成
                </div>
            </div>
            <div class="ml-8 mr-12 mt-2 text-[#333333]">
                <div
                    class="relative my-4 border-b border-[#E5E5E5] pb-4"
                    v-for="item in showingTodos"
                    :key="item.id"
                >
                    <input
                        type="checkbox"
                        class="form-checkbox mr-4 h-5 w-5 rounded-[5px] border border-[#9F9A91]"
                        @click="() => handleToggleButtonClick(item.id)"
                        :checked="item.completed_at"
                    />
                    <span
                        class="inline-block max-w-[calc(100%-4rem)] overflow-x-auto align-middle font-noto"
                        :class="{
                            'line-through': item.completed_at,
                            'text-[#9F9A91]': item.completed_at,
                        }"
                    >
                        {{ item.content }}
                    </span>
                    <span
                        class="absolute -right-8 top-2 hover:cursor-pointer"
                        @click="() => handleDeleteButtonClick(item.id)"
                    >
                        <XSvg />
                    </span>
                </div>
            </div>
            <div class="ml-8 mr-12 flex justify-between pt-6 pb-8">
                <span>
                    <span v-if="selectedViewType === 'done'"
                        >{{ doneTodos.length }} 個完成項目</span
                    >
                    <span v-else> {{ undoneTodos.length }} 個待完成項目 </span>
                </span>
                <button
                    class="text-[#9F9A91]"
                    :class="{
                        'cursor-not-allowed': !doneTodos.length,
                        'hover:underline': doneTodos.length,
                        'hover:text-[#333333]': doneTodos.length,
                    }"
                    @click="handleClearDoneButtonClick"
                    :disabled="!doneTodos.length"
                >
                    清除已完成項目
                </button>
            </div>
        </div>
        <Teleport to="#portal-target">
            <OverlayScreen :loading="true" v-if="showOverlay" />
        </Teleport>
    </div>
</template>
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useAPI } from '../store/use-api';
import TodoCreate from './todo-create.vue';
import OverlayScreen from './overlay-screen.vue';
import XSvg from './x-svg.vue';
const api = useAPI();
const showOverlay = ref(false);
type viewType = 'all' | 'done' | 'undone';
const selectedViewType = ref<viewType>('all');
const undoneTodos = computed(() =>
    api.todolist.filter((e) => e.completed_at === null)
);
const doneTodos = computed(() =>
    api.todolist.filter((e) => e.completed_at !== null)
);
const showingTodos = computed(() => {
    switch (selectedViewType.value) {
        case 'done':
            return doneTodos.value;
        case 'undone':
            return undoneTodos.value;
        default:
            return api.todolist;
    }
});
onMounted(async () => {
    await api.fetchTodolist();
});

const commonHandleError = (err: Error) => {
    console.error(err);
    window.alert('發生未預期的錯誤，請重新整理網頁或稍後再試');
};

function handleDeleteButtonClick(id: string) {
    showOverlay.value = true;
    api.deleteTodo(id)
        .then(() => {
            const index = api.todolist.findIndex((e) => e.id === id);
            api.todolist.splice(index, 1);
        })
        .catch(commonHandleError)
        .finally(() => {
            showOverlay.value = false;
        });
}

function handleToggleButtonClick(id: string) {
    showOverlay.value = true;
    api.toggleTodo(id)
        .then(async () => {
            await api.fetchTodolist();
        })
        .catch(commonHandleError)
        .finally(() => {
            showOverlay.value = false;
        });
}

function handleClearDoneButtonClick() {
    showOverlay.value = true;
    const ids = doneTodos.value.map((e) => e.id);
    Promise.all(ids.map((id) => api.deleteTodo(id)))
        .then(async () => {
            await api.fetchTodolist();
        })
        .catch(commonHandleError)
        .finally(() => {
            showOverlay.value = false;
        });
}
</script>
