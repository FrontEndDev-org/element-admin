<script setup lang="ts">
import { DialogLayout } from '../../../../src';
import { ElMessage } from 'element-plus';
const dialogLayoutRef = ref<InstanceType<typeof DialogLayout> | null>(null);

const luckyCount = ref(0);

const onButtonClick = () => {
    luckyCount.value = Math.floor(Math.random() * 100);
    dialogLayoutRef.value?.open({
        title: '你好👋',
        content: `你的幸运数字是 ${luckyCount.value}`,
        cancelMethod: () => {
            if (luckyCount.value % 2 === 0) {
                ElMessage.info('偶数不让关');
                return false;
            }
            ElMessage.info('奇数可以关');
        },
        confirmMethod: () => {
            ElMessage.success('确定');
        },
    });
};
</script>

<template>
    <el-button type="primary" @click="onButtonClick">打开对话框</el-button>
    <DialogLayout ref="dialogLayoutRef"> 原始内容 </DialogLayout>
</template>
