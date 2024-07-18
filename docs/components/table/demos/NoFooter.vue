<script setup lang="ts">
import { TableLayout, useTableLayout } from '../../../../src';

useTableLayout({
    loadMethod: () => {
        return Promise.resolve({
            data: [
                {
                    name: '张三',
                    id: 1,
                },
                {
                    name: '李狗蛋',
                    id: 2,
                },
            ],
            total: 2,
        });
    },
});
</script>

<template>
    <TableLayout :footer="false" max-height="300">
        <el-table-column prop="id" label="ID" />
        <el-table-column prop="name" label="名称" />
    </TableLayout>
</template>
