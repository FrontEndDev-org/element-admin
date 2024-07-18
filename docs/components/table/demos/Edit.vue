<script setup lang="ts">
import {
    TableLayout,
    TableActionColumn,
    TableActionEdit,
    TableFormDialog,
    FormInput,
    useTableLayout,
} from '../../../../src';

interface MyForm {
    name: string;
    id: number;
}
const mockData1 = reactive({ name: '张三', id: 1 });
const mockData2 = reactive({ name: '李狗蛋', id: 2 });

useTableLayout<MyForm>({
    loadMethod: () => {
        return Promise.resolve({
            data: [mockData1, mockData2],
            total: 2,
        });
    },
    saveMethod: async ({ form }) => {
        [mockData1, mockData2][form.id - 1].name = form.name;
        return Promise.resolve();
    },
    formRules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
    },
});
</script>

<template>
    <TableLayout row-key="id" :footer="false" max-height="300">
        <el-table-column prop="id" label="ID" />
        <el-table-column prop="name" label="名称" />
        <TableActionColumn>
            <TableActionEdit dialog-title="编辑信息" />
        </TableActionColumn>
    </TableLayout>
    <TableFormDialog>
        <template #default="{ form }">
            <FormInput v-model="form.name" prop="name" label="名称" />
        </template>
    </TableFormDialog>
</template>
