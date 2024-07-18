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
    <TableLayout max-height="600">
        <el-table-column prop="id" label="ID" />
        <el-table-column prop="name" label="名称" />
    </TableLayout>
</template>
