<script setup>
import { computed } from 'vue';

const props = defineProps({
    label : {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    sort_field: String,
    sort_direction: String,
});

const emit = defineEmits(['click']);

const arrowSortDown = computed(() => {
    return (props.sort_direction == 'desc' && props.sort_field == props.name);
});
const arrowSortUp = computed(() => {
    return (props.sort_direction == 'asc' && props.sort_field == props.name);
});

</script>

<template>
    <a href="" @click.prevent="emit('click')">{{ props.label }}</a>
    <span v-if="arrowSortDown" class="justify-content-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24" style="width: 25px; height: 25px"
            stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"/>
        </svg>
    </span>
    <span v-if="arrowSortUp" class="justify-content-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" style="width: 25px; height: 25px"
            stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"/>
        </svg>
    </span>
</template>

<style scoped>

</style>