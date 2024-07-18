<script setup lang="ts">
import { useTableLayout } from '../composables';
import { ElButton, ElMessage } from 'element-plus';
import { INNER_KEY } from '../const';

const props = defineProps<{
    title?: ((row: any) => string) | string;
    content?: ((row: any) => string) | string;
}>();

const row = inject('row');

const tableStore = useTableLayout(INNER_KEY);
const onDeleteClick = () => {
    if (!row.value) {
        return console.error(
            '请在 TableActionColumn 中使用 TableAction系列组件'
        );
    }
    if (!tableStore.deleteConfirmDialogRef?.value) {
        return console.error('需要配合 TableDeleteDialog 使用');
    }
    // @ts-ignore
    tableStore.deleteConfirmDialogRef.value.open({
        title:
            typeof props.title === 'function'
                ? props.title(row.value)
                : props.title ?? '删除',
        content:
            typeof props.content === 'function'
                ? props.content(row.value)
                : props.content ?? '确定要删除吗',
        confirmMethod: onDeleteConfirm,
    });
};
const onDeleteConfirm = async () => {
    if (!tableStore.delete) {
        throw new Error('缺少删除方法');
    }

    // 捕获错误 使delete继续向下执行 关闭确认删除弹框  但是  如果报错 不提示删除成功
    try {
        await tableStore.delete(row.value);
        ElMessage.success('删除成功');
        tableStore.refresh();
    } catch (e) {
        console.log(e);
    }
};
</script>

<template>
    <el-button link type="primary" @click="onDeleteClick">
        <slot> 删除 </slot>
    </el-button>
</template>

<style scoped lang="scss"></style>
