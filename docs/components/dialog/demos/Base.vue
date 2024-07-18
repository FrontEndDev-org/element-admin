<script setup lang="ts">
import { DialogLayout } from '../../../../src';
import { ElMessage } from 'element-plus';
const dialogLayoutRef = ref<InstanceType<typeof DialogLayout> | null>(null);
const onButtonClick = () => {
    dialogLayoutRef.value?.open();
};
const onDialogCancel = () => {
    ElMessage.info('取消');
    // 返回 false 可以阻止对话框关闭
    // return false;
};
const onDialogConfirm = () => {
    ElMessage.success('确定');
};
</script>

<template>
    <el-button type="primary" @click="onButtonClick">打开对话框</el-button>
    <DialogLayout
        ref="dialogLayoutRef"
        title="Hello"
        :cancel-method="onDialogCancel"
        :confirm-method="onDialogConfirm"
        cancel-text="算了"
        confirm-text="好的!"
    >
        World~
    </DialogLayout>
</template>
