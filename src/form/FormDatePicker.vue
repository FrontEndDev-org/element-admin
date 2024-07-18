<script setup lang="ts">
import { BaseFormItemProps } from './types';
import { DatePickerProps, ElDatePicker, ElFormItem } from 'element-plus';

const props = defineProps<
    BaseFormItemProps & {
        type?: 'date' | 'datetime';
        valueFormat?: DatePickerProps['valueFormat'];
        disabledDate?: DatePickerProps['disabledDate'];
        size?: DatePickerProps['size'];
    }
>();

const emit = defineEmits(['update:modelValue', 'change']);

const _value = computed({
    get: () => props.modelValue,
    set: (v) => onChange(v),
});

const onChange = (v: any) => {
    console.log(v);
    emit('update:modelValue', v);
    emit('change', v);
};
// TODO 范围，日期时间
</script>

<template>
    <el-form-item :label="label" :prop="prop">
        <el-date-picker
            v-model="_value"
            class="!w-80"
            :size="size"
            :placeholder="placeholder"
            :type="type || 'date'"
            :disabled="disabled"
            :value-format="valueFormat"
            :disabled-date="disabledDate"
        />
    </el-form-item>
</template>

<style scoped lang="scss"></style>
