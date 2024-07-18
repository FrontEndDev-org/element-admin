<script setup lang="ts">
import {
    TableLayout,
    TableActionColumn,
    TableActionDelete,
    TableDeleteDialog,
    useTableLayout,
} from '../../../../src';

const mockData = ref(
    new Array(50).fill(0).map((_, index) => ({
        id: index,
        name: `name${index}`,
    }))
);

useTableLayout({
    loadMethod: ({ pageNum, pageSize }) => {
        return Promise.resolve({
            data: mockData.value.slice(
                (pageNum - 1) * pageSize,
                pageNum * pageSize
            ),
            total: mockData.value.length,
        });
    },
    deleteMethod: ({ row }) => {
        const findIndex = mockData.value.findIndex(
            (item) => item.id === row.id
        );
        mockData.value.splice(findIndex, 1);
        return Promise.resolve();
    },
});
</script>

<template>
    <div class="container">
        <TableLayout row-key="id">
            <el-table-column prop="id" label="ID" />
            <el-table-column prop="name" label="名称" />
            <TableActionColumn>
                <TableActionDelete
                    :title="() => '删除提醒'"
                    :content="(row) => `确认要删除${row.name}吗？`"
                />
                <TableActionDelete
                    title="删除提醒固定标题"
                    content="删除提醒固定内容"
                >
                    移除
                </TableActionDelete>
            </TableActionColumn>
        </TableLayout>
        <TableDeleteDialog />
    </div>
</template>

<style scoped lang="scss">
.container {
    @apply h-[400px] flex flex-col;
}
</style>
