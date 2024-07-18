<script setup lang="ts">
const props = defineProps<{
    row: any;
}>();

const computedRow = computed(() => {
    return props.row;
});

provide('row', computedRow);
</script>

<template>
    <slot> </slot>
</template>
