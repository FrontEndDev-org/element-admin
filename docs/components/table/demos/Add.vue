<script setup lang="ts">
import {
    TableLayout,
    TableOperatorCreate,
    TableFormDialog,
    FormInput,
    useTableLayout,
} from '../../../../src';

const mockData = ref([]);

useTableLayout<{ name: string }>({
    loadMethod: () => {
        return Promise.resolve({
            data: mockData.value,
            total: mockData.value.length,
        });
    },
    saveMethod: async ({ form }) => {
        mockData.value.push({ ...form, id: Math.floor(Math.random() * 100) });
        return Promise.resolve();
    },
    formInitMethod: () => {
        return { name: '' };
    },
    formRules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
    },
});
</script>

<template>
    <TableLayout max-height="300" :footer="false">
        <template #opt-right>
            <TableOperatorCreate dialog-title="添加信息" />
        </template>
        <el-table-column prop="id" label="ID" />
        <el-table-column prop="name" label="名称" />
    </TableLayout>
    <TableFormDialog>
        <template #default="{ form }">
            <FormInput v-model="form.name" prop="name" label="名称" />
        </template>
    </TableFormDialog>
</template>
