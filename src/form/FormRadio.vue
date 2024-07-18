<script setup lang="ts">
import { Option } from '../types';
import { BaseFormItemProps } from './types';
import { ElFormItem, ElRadio, ElRadioGroup } from 'element-plus';

defineProps<
    BaseFormItemProps & {
        options: Option[];
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
        <el-radio-group
            class="w-40"
            :model-value="modelValue"
            :placeholder="placeholder"
            :disabled="disabled"
            @change="onChange"
        >
            <el-radio
                v-for="item in options"
                :key="item.value"
                :label="item.value"
            >
                {{ item.label }}
            </el-radio>
        </el-radio-group>
    </el-form-item>
</template>

<style scoped lang="scss"></style>
