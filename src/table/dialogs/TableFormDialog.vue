<script setup lang="ts">
import { useTableLayout } from '../composables';
import DialogLayout from '../../dialog/DialogLayout.vue';
import { ElMessage, ElForm } from 'element-plus';
import { FormCurrentType } from '../types';
import { deepClone } from '../../utils';

const props = defineProps<{
    layoutKey?: string;
    // 是否展示错误提示
    showErrorMessage?: boolean;
}>();

const tableStore = useTableLayout(props.layoutKey);

const cancelMethod = () => {
    tableStore.formRef?.value?.resetFields();
    if (tableStore.formData)
        for (const key in tableStore.formData) {
            tableStore.formData[key] = undefined;
        }
};

const currentType = ref<FormCurrentType>('add');
const confirmMethod = async () => {
    if (!tableStore.formRef?.value) {
        throw new Error('formRef 未初始化');
    }
    if (!tableStore.saveMethod) {
        throw new Error('未设置保存方法');
    }

    try {
        await tableStore.formRef.value?.validate();
    } catch (e) {
        // 返回 false 会阻止对话框关闭
        return false;
    }

    await tableStore.saveMethod({
        type: currentType.value,
        form: tableStore.formData,
    });
    ElMessage.success('保存成功');

    if (currentType.value === 'edit') {
        tableStore.refresh();
    } else {
        tableStore.reset();
    }
};

const currentTitle = ref('');
tableStore.formDialog.open = async ({ type, row, title }) => {
    currentType.value = type;
    let initData = {};
    if (type === 'edit') {
        currentTitle.value = title ?? '编辑';
        initData =
            (await tableStore.formInitMethod?.({
                type,
                row,
            })) || row;
    } else if (type === 'add') {
        if (!(await tableStore.formInitMethod)) {
            return console.error('未设置表单初始化方法');
        }
        currentTitle.value = title ?? '新增';
        initData =
            (await tableStore.formInitMethod?.({
                type,
                row,
            })) || {};
    } else {
        currentTitle.value = title ?? '查看';
        initData =
            (await tableStore.formInitMethod?.({
                type,
                row,
            })) || row;
    }

    tableStore.formData = reactive(deepClone(initData));
    // @ts-ignore
    dialogLayoutRef.value?.open?.();
    tableStore.formRef?.value?.resetFields();
};

const dialogLayoutRef = computed({
    get: () => tableStore.formDialog.ref,
    set: (val) => (tableStore.formDialog.ref = val),
});
</script>

<template>
    <DialogLayout
        ref="dialogLayoutRef"
        :cancel-method="cancelMethod"
        :confirm-method="confirmMethod"
        :show-error-message="props.showErrorMessage"
        :title="currentTitle"
    >
        <template #header>
            <slot
                name="header"
                :form="tableStore.formData"
                :type="currentType"
            />
        </template>

        <el-form
            :ref="tableStore.formRef"
            label-position="top"
            :rules="tableStore.formRules || {}"
            :model="tableStore.formData"
            @submit.prevent
        >
            <slot :form="tableStore.formData" :type="currentType" />
        </el-form>

        <template #footer>
            <slot
                name="footer"
                :form="tableStore.formData"
                :type="currentType"
            />
        </template>
    </DialogLayout>
</template>

<style scoped lang="scss"></style>
