<script setup lang="ts">
import { useTableLayout } from '../composables';
import DialogLayout from '../../dialog/DialogLayout.vue';
import { INNER_KEY } from '../const';
import { ElTransfer, ElButton } from 'element-plus';

interface propsType {
    label?: string;
    title?: string;
    leftTitle?: string;
    rightTitle?: string;
    width?: number | string;
    hideColumns?: any[];
}

let props = withDefaults(defineProps<propsType>(), {
    label: '列',
    title: '控制显隐列',
    leftTitle: '显示列',
    rightTitle: '隐藏列',
    width: '700',
    hideColumns: () => [],
});

const tableStore = useTableLayout(INNER_KEY);
tableStore.hideColumns.value = unref(props.hideColumns);

// 控制弹框
const controlColumnDialog = ref<InstanceType<typeof DialogLayout>>();

// 顶部title
const titles = computed(() => [props.leftTitle, props.rightTitle] as string[]);

// 数据 —— 右侧数据concealData
let hideColumns = computed(() => tableStore?.hideColumns.value || []);
// 数据 —— 左侧数据
const allColumns = computed(() => tableStore?.allColumns.value || []);

const _hideColumns = ref<any[]>([]);
const onChangeColumnsVisibleClick = () => {
    _hideColumns.value = hideColumns.value.slice();
    controlColumnDialog.value?.open();
};

// 确定操作
const confirmMethod = () => {
    tableStore.hideColumns.value = _hideColumns.value;
};
</script>

<template>
    <div @click="onChangeColumnsVisibleClick">
        <slot>
            <el-button @click.prevent>{{ props.label }}</el-button>
        </slot>
    </div>

    <DialogLayout
        v-bind="$props"
        ref="controlColumnDialog"
        :title="props.title"
        :confirm-method="confirmMethod"
    >
        <template #header>
            <slot name="dialogHeader" />
        </template>

        <el-transfer
            ref="transferRef"
            v-bind="$attrs"
            v-model="_hideColumns"
            class="control-column__transfer"
            :titles="titles"
            :props="{ key: 'prop', label: 'label', disabled: 'disabled' }"
            :data="allColumns"
        />

        <template #footer>
            <slot name="dialogFooter" />
        </template>
    </DialogLayout>
</template>

<style lang="scss" scoped>
.control-column {
    &__transfer {
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>
