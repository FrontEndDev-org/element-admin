<script setup lang="ts">
import { useTableLayout } from '../composables';
import { INNER_KEY } from '../const';

const props = defineProps<{
    paramKey: string;
    label?: string;
}>();
const tableStore = useTableLayout(INNER_KEY);
tableStore.params[props.paramKey] = '';
</script>

<template>
    <div v-if="label" class="-mr-3 text-sm font-bold text-filter-label">
        {{ label }}
    </div>
    <slot :params="tableStore.params"></slot>
</template>
