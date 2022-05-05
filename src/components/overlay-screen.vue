<template>
    <div
        class="absolute inset-0 z-40 flex items-center justify-center bg-black/60"
    >
        <!-- class="rounded-md border-white bg-slate-50 p-4 shadow-md" -->
        <div v-if="!props.loading">
            <slot></slot>
        </div>
        <div class="scale-150 transform" v-if="props.loading">
            <LoadingSvg />
        </div>
    </div>
</template>
<script setup lang="ts">
import LoadingSvg from './loading-svg.vue';
const props = defineProps({
    loading: {
        type: Boolean,
        default: false,
    },
});
</script>
