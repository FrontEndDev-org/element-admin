<script setup lang="ts">
import {
    TableLayout,
    TableActionColumn,
    useTableLayout,
} from '../../../../src';
import { Menu } from '@element-plus/icons-vue';

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
            <el-table-column prop="name" label="名称" />
            <TableActionColumn width="120">
                <el-button link type="primary">操作1</el-button>
                <el-button link type="primary">操作2</el-button>
            </TableActionColumn>
            <TableActionColumn :max-length="1" width="130">
                <el-button link type="primary">操作1</el-button>
                <el-button link type="primary">操作2</el-button>
            </TableActionColumn>
            <TableActionColumn :max-length="1">
                <el-button link type="primary">操作1</el-button>
                <el-button link type="primary">操作2</el-button>
                <el-button link type="primary">操作3</el-button>
                <template #more-popover-reference>
                    <el-icon>
                        <Menu />
                    </el-icon>
                </template>
            </TableActionColumn>
        </TableLayout>
    </div>
</template>

<style scoped lang="scss">
.container {
    @apply h-[400px] flex flex-col;
}
</style>
