<script setup lang="ts">
import { BaseFormItemProps } from './types';
import { ElFormItem, ElInput } from 'element-plus';

defineProps<
    BaseFormItemProps & {
        textarea?: boolean;
    }
>();

const emit = defineEmits(['update:modelValue', 'input']);

const onInput = (v: any) => {
    emit('update:modelValue', v);
    emit('input', v);
};
</script>

<template>
    <el-form-item :label="label" :prop="prop">
        <el-input
            class="!w-80"
            :model-value="modelValue"
            :autosize="
                textarea
                    ? {
                          minRows: 2,
                          maxRows: 4,
                      }
                    : false
            "
            :placeholder="placeholder"
            :disabled="disabled"
            :type="textarea ? 'textarea' : ''"
            @input="onInput"
        ></el-input>
    </el-form-item>
</template>

<style scoped lang="scss"></style>
