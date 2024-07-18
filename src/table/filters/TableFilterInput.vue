<script setup lang="ts">
import { useTableLayout } from '../composables';
import { ElInput } from 'element-plus';
import { INNER_KEY } from '../const';

const props = defineProps<{
    paramKey: string;
    placeholder?: string;
    label?: string;
}>();
const tableStore = useTableLayout(INNER_KEY);

tableStore.params[props.paramKey] = '';

const search = computed({
    get: () => tableStore.params[props.paramKey],
    set: (val) => {
        tableStore.params[props.paramKey] = val;
    },
});
</script>

<template>
    <div v-if="label" class="-mr-3 text-sm font-bold text-filter-label">
        {{ label }}
    </div>
    <div class="w-40">
        <el-input
            v-model="search"
            :placeholder="placeholder"
            clearable
        ></el-input>
    </div>
</template>
