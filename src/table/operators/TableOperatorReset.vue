<script setup lang="ts">
import { useTableLayout } from '../composables';
import { ElButton } from 'element-plus';
import { INNER_KEY } from '../const';

const tableStore = useTableLayout(INNER_KEY);
const onReset = () => {
    tableStore.reset();
};
</script>

<template>
    <el-button type="primary" @click="onReset"> 重置 </el-button>
</template>
