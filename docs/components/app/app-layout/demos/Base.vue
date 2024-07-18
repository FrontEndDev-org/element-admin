<script setup lang="ts">
import { AppLayout } from '../../../../../src';
</script>

<template>
    <AppLayout
        menu-bg-color="#cecece"
        menu-full-height
        :header-height="40"
        :menu-width="200"
        :content-padding="12"
        content-scroll
    >
        <template #headerLeft> header left slot </template>
        <template #headerRight> header right slot </template>
        <template #menu> menu slot </template>
        <template #content>
            <div style="height: 600px; background: white">content slot</div>
        </template>
    </AppLayout>
</template>

<style lang="scss">
// 演示用，不要在项目中使用
.app__menu-content__wrapper {
    height: 400px !important;
    min-height: 400px !important;
}

.app__menu__wrapper {
    height: 440px !important;
}
</style>
