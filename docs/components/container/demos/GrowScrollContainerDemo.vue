<script setup lang="ts">
import { GrowScrollContainer } from '../../../../src';
</script>

<template>
    <div class="container">
        <div>这是一个flex容器</div>
        <GrowScrollContainer class="scroll-container">
            <div class="content">
                GrowScrollContainer 自动撑满剩余高度， 内容可滚动
            </div>
        </GrowScrollContainer>
        <div>这是一个flex容器</div>
    </div>
</template>

<style lang="scss" scoped>
.container {
    @apply flex flex-col h-96 border;

    .scroll-container {
        @apply bg-red-50;

        .content {
            @apply h-[600px];
        }
    }
}
</style>
