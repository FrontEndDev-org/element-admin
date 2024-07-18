<script setup lang="ts">
import { useTableLayout } from './composables';
import { ElPagination, ElTable } from 'element-plus';
import { INNER_KEY } from './const';

// @ts-ignore
const props = withDefaults(
    defineProps<{
        maxHeight?: string | number;
        rowKey?: string | ((row: any) => string);
        layoutKey?: string;
        footer?: boolean;
        border?: boolean;
        stripe?: boolean;
    }>(),
    {
        maxHeight: undefined,
        rowKey: undefined,
        layoutKey: undefined,
        footer: true,
        border: false,
        stripe: true,
    },
);

const tableStore = useTableLayout(props.layoutKey);
provide(INNER_KEY, tableStore);

const handleSizeChange = (val: number) => {
    tableStore.params.pageSize = val;
};
const handleCurrentChange = (val: number) => {
    tableStore.params.pageNum = val;
};

const tableData = computed(() => {
    return tableStore.tableData.value;
});
const currentPage = computed({
    get: () => {
        return tableStore.params.pageNum;
    },
    set: (val) => {
        tableStore.params.pageNum = val;
    },
});
const pageSize = computed({
    get: () => {
        return tableStore.params.pageSize;
    },
    set: (val) => {
        tableStore.params.pageSize = val;
    },
});
const total = computed(() => {
    return tableStore.total.value;
});

const slots = useSlots();
// 同步列数据
tableStore.allColumns.value = (slots.default?.() || [])
    .map((item) => {
        if (item?.props?.prop && item?.props?.prop !== 'handler')
            return { prop: item?.props?.prop, label: item?.props?.label };
    })
    .filter((i) => i);

// 列展示
const showColumnData = computed(() => {
    // 保底返回 []  el-table只存在default插槽
    return (
        slots.default?.().filter((item) => {
            return !tableStore.hideColumns.value?.includes(item.props?.prop);
        }) || []
    );
});
</script>

<template>
    <div
        class="flex flex-wrap items-center gap-4"
        :class="[
            $style['option-bar'],
            {
                'pb-4': $slots.opt || $slots['opt-left'] || $slots['opt-right'],
            },
        ]"
    >
        <slot name="opt" :params="tableStore.params">
            <slot name="opt-left" :params="tableStore.params"></slot>
            <div class="flex-grow"></div>
            <slot name="opt-right" :params="tableStore.params"></slot>
        </slot>
    </div>
    <el-table
        v-if="maxHeight"
        :data="tableData"
        :row-key="rowKey"
        :max-height="maxHeight"
        :border="border"
        :stripe="stripe"
        v-bind="$attrs"
    >
        <template v-for="(child, index) in showColumnData" :key="index">
            <component :is="child"></component>
        </template>
    </el-table>
    <div v-else class="flex-grow relative">
        <div class="absolute inset-0">
            <el-table
                :data="tableData"
                :row-key="rowKey"
                :border="border"
                :stripe="stripe"
                height="100%"
                v-bind="$attrs"
            >
                <template v-for="(child, index) in showColumnData" :key="index">
                    <component :is="child"></component>
                </template>
            </el-table>
        </div>
    </div>

    <!--footer 分页-->
    <div v-if="footer" class="flex gap-1 mt-4">
        <div class="flex-grow"></div>
        <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[10, 20, 50, 100]"
            size="small"
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        />
    </div>
</template>

<style lang="scss" module>
.option-bar {
    :global(.ep-button + .ep-button) {
        margin-left: 0;
    }

    :global(.el-button + .el-button) {
        margin-left: 0;
    }
}
</style>
