<script setup lang="ts">
import { TabBar } from '../../../../src';

const activeTab = ref('tab1');
const tabs = ref([
    {
        label: 'Tab 1',
        value: 'tab1',
    },
    {
        label: 'Tab 2',
        value: 'tab2',
    },
    {
        label: 'Tab 3',
        value: 'tab3',
    },
]);
</script>

<template>
    <TabBar v-model="activeTab" :tabs="tabs" />
    <div v-if="activeTab === 'tab1'" class="tab1">Tab1 height 100px</div>
    <div v-if="activeTab === 'tab2'" class="tab2">Tab2 height 200px</div>
    <div v-if="activeTab === 'tab3'" class="tab3">Tab3 height 300px</div>
    <div class="follow">跟随内容</div>
</template>

<style scoped lang="scss">
.tab1 {
    @apply h-[100px] border;
}

.tab2 {
    @apply h-[200px] border;
}

.tab3 {
    @apply h-[300px] border;
}

.follow {
    @apply h-[100px] border;
}
</style>
