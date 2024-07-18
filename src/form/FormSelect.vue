<script setup lang="ts">
import { Option } from '../types';
import { BaseFormItemProps } from './types';
import { ElFormItem, ElOption, ElSelect } from 'element-plus';

defineProps<
    BaseFormItemProps & {
        options: Option[];
        multiple?: boolean;
    }
>();

const emit = defineEmits(['update:modelValue', 'change']);

const onChange = (v: any) => {
    emit('update:modelValue', v);
    emit('change', v);
};
</script>

<template>
    <el-form-item :label="label" :prop="prop">
        <el-select
            class="!w-80"
            :model-value="modelValue"
            :placeholder="placeholder"
            :disabled="disabled"
            :clearable="clearable"
            :filterable="filterable"
            :multiple="multiple"
            @change="onChange"
        >
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            >
            </el-option>
        </el-select>
    </el-form-item>
</template>

<style scoped lang="scss"></style>
