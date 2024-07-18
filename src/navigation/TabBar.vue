<script setup lang="ts">
defineProps<{
    modelValue: string | number;
    tabs: { label: string; value: string | number }[];
}>();
const emit = defineEmits(['update:modelValue']);
</script>

<template>
    <div class="tab-bar">
        <div
            v-for="tab of tabs"
            :key="tab.value"
            class="tab-item"
            :class="{ active: modelValue === tab.value }"
            @click="emit('update:modelValue', tab.value)"
        >
            {{ tab.label }}
        </div>
    </div>
</template>

<style scoped lang="scss">
.tab {
    &-bar {
        @apply flex items-center gap-[36px] h-[40px] bg-white mb-[15px];
    }

    &-item {
        @apply text-[14px] leading-[40px] font-[500]
          relative
          border-y-[2px] border-transparent
          cursor-pointer select-none;

        &.active {
            @apply text-[var(--el-color-primary)] border-b-[var(--el-color-primary)];
        }

        &.disabled {
            @apply opacity-50;
        }
    }
}
</style>
