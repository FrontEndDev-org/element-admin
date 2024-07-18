<script setup lang="ts">
import {
    TableLayout,
    useTableLayout,
    TableOperatorColumnVisible,
    TableActionEdit,
    TableActionDelete,
    TableFormDialog,
    TableFilterSelect,
    TableActionColumn,
} from '../../../../src';

export interface MyFormData<T = number | null> {
    name: string;
    page: 111;
    id?: number;
}

// 使用TableLayout
const tableStore = useTableLayout<MyFormData>({
    layoutKey: 'requirement-table',
    // 加载方法
    loadMethod: async () => {
        return {
            data: [{ name: '1', page: 111 }],
            total: 0,
        };
    },
});
</script>

<template>
    <!--    表格-->
    <TableLayout :max-height="400" :layout-key="'requirement-table'">
        <template #opt-left>
            <TableFilterSelect
                param-key="requiredTitle"
                :options="[
                    { label: '1', value: 2 },
                    { label: '2', value: 3 },
                ]"
                clearable
                @change="console.log(111111)"
            />
        </template>
        <template #opt-right>
            <TableOperatorColumnVisible
                label="显隐列"
                :hide-columns="['id', 'requiredTitle', 'state', 'requiredType']"
            />
        </template>
        <el-table-column prop="id" label="ID" />
        <el-table-column prop="createTime" label="创建时间" min-width="120" />
        <el-table-column
            prop="requiredTitle"
            label="需求标题"
            show-overflow-tooltip
        />
        <el-table-column
            prop="state"
            label="进度"
            show-overflow-tooltip
            min-width="150"
        />
        <el-table-column
            prop="requiredType"
            label="分类"
            show-overflow-tooltip
        />
        <el-table-column prop="priority" label="优先级" show-overflow-tooltip />
        <el-table-column prop="principal" label="需求责任人" />
        <el-table-column prop="agent" label="经办人" />
        <el-table-column
            prop="expectDate"
            label="期望上线时间"
            min-width="120"
        />
        <el-table-column
            prop="describe"
            label="需求描述"
            show-overflow-tooltip
        />
    </TableLayout>
</template>

<style scoped lang="scss"></style>
