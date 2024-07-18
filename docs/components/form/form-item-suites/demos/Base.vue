<script setup lang="ts">
import { FormDatePicker, FormRadio, FormInput } from '../../../../../src';

const form = reactive({ date: new Date(), name: '李狗蛋', sex: '2' });
</script>

<template>
    <el-form :model="form">
        <FormDatePicker
            v-model="form.date"
            label="日期"
            prop="date"
        ></FormDatePicker>
        <FormInput v-model="form.name" label="名称" prop="name"></FormInput>
        <FormRadio
            v-model="form.sex"
            label="性别"
            prop="sex"
            :options="[
                { label: '男', value: '1' },
                { label: '女', value: '2' },
            ]"
        ></FormRadio>
    </el-form>
</template>
