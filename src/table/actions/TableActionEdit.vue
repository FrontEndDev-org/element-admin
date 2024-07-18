<script setup lang="ts">
import { useTableLayout } from '../composables';
import { ElButton } from 'element-plus';
import { INNER_KEY } from '../const';

const props = defineProps<{
    dialogTitle?: ((row: any) => string) | string;
}>();
const tableStore = useTableLayout(INNER_KEY);
const row = inject('row');

const onEditClick = () => {
    if (!row.value) {
        return console.error(
            '请在 TableActionColumn 中使用 TableAction系列组件'
        );
    }
    if (!tableStore.formDialog.ref) {
        return console.error('需要配合 TableFormDialog 使用2');
    }
    if (!tableStore.saveMethod) {
        return console.error('未设置保存方法2');
    }
    tableStore.formDialog.open({
        type: 'edit',
        title:
            typeof props.dialogTitle === 'function'
                ? props.dialogTitle(row)
                : props.dialogTitle ?? '编辑',
        row: row.value,
    });
};
</script>

<template>
    <el-button link type="primary" @click="onEditClick"> 编辑 </el-button>
</template>
