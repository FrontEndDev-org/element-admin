<script setup lang="ts">
import { TableLayout, useTableLayout } from '../../../../src';

const mockData = new Array(50).fill(0).map((_, index) => ({
    id: index,
    name: `name${index}`,
}));

useTableLayout({
    loadMethod: ({ pageNum, pageSize }) => {
        return Promise.resolve({
            data: mockData.slice((pageNum - 1) * pageSize, pageNum * pageSize),
            total: mockData.length,
        });
    },
});
</script>

<template>
    <div class="container">
        <TableLayout>
            <template #opt-left>
                <el-button type="primary">按钮1</el-button>
            </template>
            <template #opt-right>
                <el-button type="primary">按钮2</el-button>
            </template>
            <!--如果你不需要左右布局的插槽，使用opt插槽可以自定义整个顶部插槽区域，
            此时 opt-left 和 opt-right 都会失效-->
            <!--<template #opt></template>-->
            <el-table-column prop="id" label="ID" />
            <el-table-column prop="name" label="名称" />
        </TableLayout>
    </div>
</template>

<style scoped lang="scss">
.container {
    @apply h-[400px] flex flex-col;
}
</style>
