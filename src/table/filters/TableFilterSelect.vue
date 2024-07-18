<script setup lang="ts">
import { useTableLayout } from '../composables';
import { Option } from '../../types';
import { ElOption, ElSelect } from 'element-plus';
import { INNER_KEY } from '../const';

const props = defineProps<{
    paramKey: string;
    options: Option[] | (() => Option[]);
    placeholder?: string;
    label?: string;
    clearable?: boolean;
    filterable?: boolean;
}>();

const tableStore = useTableLayout(INNER_KEY);

tableStore.params[props.paramKey] = '';

const search = computed({
    get: () => tableStore.params[props.paramKey],
    set: (val) => {
        tableStore.params[props.paramKey] = val;
    },
});

const options = computed<Option[]>(() => {
    if (Array.isArray(props.options)) {
        return props.options;
    } else if (typeof props.options === 'function') {
        return props.options();
    }
    return [];
});
</script>

<template>
    <div v-if="label" class="-mr-3 text-sm font-bold text-filter-label">
        {{ label }}
    </div>
    <div class="w-40">
        <el-select
            v-model="search"
            :placeholder="props.placeholder"
            :clearable="clearable"
            :filterable="filterable"
            style="width: 100%"
            v-bind="$attrs"
        >
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            >
            </el-option>
        </el-select>
    </div>
</template>
