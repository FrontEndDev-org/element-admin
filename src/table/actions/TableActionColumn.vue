<script setup lang="ts">
import TheRowProvider from './theRowProvider.vue';
import { ElTableColumn, ElButton, ElPopover, ElIcon } from 'element-plus';
import { ArrowDown } from '@element-plus/icons-vue';

interface TableActionColumnProps {
    maxLength?: number;
}

defineProps<TableActionColumnProps>();

const onDropdownItemClick = (env) => {
    try {
        env.target.children[0].click();
    } catch (e) {
        console.error(e);
    }
};
</script>

<template>
    <el-table-column ref="columnRef" label="操作" width="240" v-bind="$attrs">
        <template #default="{ row }">
            <div class="flex items-center">
                <TheRowProvider :row="row">
                    <template
                        v-if="
                            maxLength &&
                            $slots.default({ row }).length > maxLength
                        "
                    >
                        <template
                            v-for="(child, index) in $slots
                                .default({ row })
                                .splice(0, maxLength)"
                            :key="index"
                        >
                            <component :is="child"></component>
                        </template>
                        <el-popover
                            placement="bottom"
                            trigger="hover"
                            popper-style="padding: 5px 0;min-width: fit-content;"
                            width="fit-content"
                        >
                            <template #reference>
                                <slot name="more-popover-reference">
                                    <el-button link type="primary">
                                        更多
                                        <el-icon><arrow-down /></el-icon>
                                    </el-button>
                                </slot>
                            </template>
                            <template
                                v-for="(child, index) in $slots
                                    .default({ row })
                                    .slice(maxLength)"
                                :key="index"
                            >
                                <div
                                    class="leading-[22px] py-[5px] px-[16px] hover:bg-[var(--el-color-primary-light-9)] cursor-pointer"
                                    @click="onDropdownItemClick"
                                >
                                    <component
                                        :is="child"
                                        @click.stop
                                    ></component>
                                </div>
                            </template>
                        </el-popover>
                    </template>

                    <slot v-else :row="row"> </slot>
                </TheRowProvider>
            </div>
        </template>
    </el-table-column>
</template>
