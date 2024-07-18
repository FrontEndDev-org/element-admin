<script setup lang="ts">
import { useTableLayout } from '../composables';
import { ElButton } from 'element-plus';
import { INNER_KEY } from '../const';
const props = defineProps<{
    label?: string;
    dialogTitle?: (() => string) | string;
}>();

const tableStore = useTableLayout(INNER_KEY);
const onClick = async () => {
    if (!tableStore.formDialog.ref) {
        return console.error('需要配合 TableFormDialog 使用1');
    }
    if (!tableStore.saveMethod) {
        return console.error('未设置保存方法1');
    }
    tableStore.formDialog.open({
        type: 'add',
        title:
            typeof props.dialogTitle === 'function'
                ? props.dialogTitle()
                : props.dialogTitle ?? '新增',
    });
};
</script>

<template>
    <el-button type="primary" @click="onClick">
        {{ props.label ?? '新增' }}
    </el-button>
</template>
