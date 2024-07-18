<script setup lang="ts">
import TableLayout from '../src/table/TableLayout.vue';
import { useTableLayout } from '../src';
import TableActionColumn from '../src/table/actions/TableActionColumn.vue';
import TableActionEdit from '../src/table/actions/TableActionEdit.vue';
import TableActionDelete from '../src/table/actions/TableActionDelete.vue';
import TableFormDialog from '../src/table/dialogs/TableFormDialog.vue';
import TableDeleteDialog from '../src/table/dialogs/TableDeleteDialog.vue';
import TableFilterSelect from '../src/table/filters/TableFilterSelect.vue';
import TableOperatorColumnVisible from '../src/table/operators/TableOperatorColumnVisible.vue';

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
    immediate: false,
    // 保存方法
    saveMethod: async ({ form }) => {
        // await (type === 'edit' ? updateRequirement : addRequirement)({ ...data, productId: productId.value });
        throw new Error('错误');
    },
    // 初始化表单方法
    formInitMethod: ({ row, type }) => {
        console.log(row);
        return row as MyFormData;
    },
    deleteMethod: async ({ row }) => {
        console.log(row);
    },
});
tableStore.refresh();
const handleDoubleClick = (row, column) => {
    console.log(row, column);
};
</script>

<template>
    <!--    表格-->
    <TableLayout
        :max-height="400"
        :layout-key="'requirement-table'"
        @cell-dblclick="handleDoubleClick"
    >
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
            <TableOperatorColumnVisible />
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
        <TableActionColumn
            :layout-key="'requirement-table'"
            fixed="right"
            min-width="180"
        >
            <template #default>
                <TableActionEdit
                    :layout-key="'requirement-table'"
                    dialog-title="编辑需求"
                />
                <TableActionDelete :layout-key="'requirement-table'"
                    >删除</TableActionDelete
                >
            </template>
        </TableActionColumn>
    </TableLayout>

    <!--        编辑与添加弹框-->
    <TableFormDialog
        width="700"
        modal
        :show-error-message="true"
        :layout-key="'requirement-table'"
    >
        <template #header>啥也不是</template>

        <template #default="{ form }">
            <!--            需求标题-->
            <el-form-item label="需求标题" prop="requiredTitle">
                <el-input
                    v-model="form.requiredTitle"
                    placeholder="一句话简要描述需求"
                />
            </el-form-item>

            <!--            需求描述-->
            <el-form-item
                label="需求描述"
                prop="describe"
                :rules="{
                    required: !form.link,
                    message: '请填写需求描述',
                    trigger: ['blur'],
                }"
            >
                <el-input
                    v-model="form.describe"
                    placeholder="详细的需求背景"
                />
            </el-form-item>
        </template>
    </TableFormDialog>
</template>

<style scoped lang="scss"></style>
