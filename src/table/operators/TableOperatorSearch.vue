<script setup lang="ts">
import { useTableLayout } from '../composables';
import { ElButton } from 'element-plus';
import { INNER_KEY } from '../const';

const tableStore = useTableLayout(INNER_KEY);
const onSearch = () => {
    tableStore.refresh();
};
</script>

<template>
    <el-button type="primary" @click="onSearch"> 查询 </el-button>
</template>
