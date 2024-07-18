<script setup lang="ts">
import {
    TableLayout,
    TableFilterInput,
    TableFilterSelect,
    TableOperatorSearch,
    TableOperatorReset,
    useTableLayout,
} from '../../../../src';

const mockData = new Array(50).fill(0).map((_, index) => ({
    id: index,
    name: `name${index}`,
    sex: Math.floor(Math.random() * 2),
}));

useTableLayout({
    loadMethod: ({ pageNum, pageSize, name, sex }) => {
        const res = mockData.filter((item) => {
            if (name && !item.name.includes(name)) return false;
            return !(sex != null && item.sex !== sex);
        });
        return Promise.resolve({
            data: res.slice((pageNum - 1) * pageSize, pageNum * pageSize),
            total: res.length,
        });
    },
});
</script>

<template>
    <div class="container">
        <TableLayout>
            <template #opt-left>
                <TableFilterInput param-key="name" label="名称" />
                <TableFilterSelect
                    param-key="sex"
                    :options="[
                        { label: '男', value: 1 },
                        { label: '女', value: 0 },
                    ]"
                    label="性别"
                />
                <TableOperatorSearch />
                <TableOperatorReset />
            </template>
            <el-table-column prop="id" label="ID" />
            <el-table-column prop="name" label="名称" />
            <el-table-column
                prop="sex"
                label="性别"
                :formatter="(r, c, v) => (v ? '男' : '女')"
            />
        </TableLayout>
    </div>
</template>

<style scoped lang="scss">
.container {
    @apply h-[400px] flex flex-col;
}
</style>
