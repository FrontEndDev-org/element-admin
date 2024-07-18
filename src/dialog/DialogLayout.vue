<script setup lang="ts">
import { DialogLayoutExpose, DialogLayoutProps } from './types';
import { ElMessage, ElButton, ElDialog, DialogProps } from 'element-plus';

const props = defineProps<
    DialogLayoutProps &
        Partial<DialogProps> & {
            showErrorMessage?: boolean;
            cancelDisabled?: boolean;
            confirmDisabled?: boolean;
            beforeClose?: () => void;
        }
>();
const visible = ref(false);
const confirmLoading = ref(false);

type CurrentProps = Partial<DialogLayoutProps & { content: string }>;
const _currentProps: CurrentProps = reactive({});
const _title = computed(() => _currentProps.title ?? props.title ?? '标题');
const _content = computed(() => _currentProps.content);
const _confirmText = computed(
    () => _currentProps.confirmText ?? props.confirmText ?? '确定'
);
const _cancelText = computed(
    () => _currentProps.cancelText ?? props.cancelText ?? '取消'
);

const confirmMethod = computed(
    () => _currentProps.confirmMethod ?? props.confirmMethod
);
const cancelMethod = computed(
    () => _currentProps.cancelMethod ?? props.cancelMethod
);

const onClose = async () => {
    if ((await cancelMethod.value?.()) === false) {
        return;
    }
    visible.value = false;
};
const onConfirm = async () => {
    if (confirmLoading.value) {
        return;
    }
    if (!confirmMethod.value) {
        return (visible.value = false);
    }
    confirmLoading.value = true;
    try {
        const res = await confirmMethod.value();
        if (res === false) {
            return;
        }
        visible.value = false;
    } catch (e: any) {
        // 不开启则不展示elMessage.error
        if (!props.showErrorMessage) {
            return;
        }
        ElMessage.error(e.message ?? e);
    } finally {
        confirmLoading.value = false;
    }
};
// 对话框的 X 按钮点击时触发
const beforeClose = async (done: () => void) => {
    if (confirmLoading.value) {
        return;
    }
    if ((await cancelMethod.value?.()) === false) {
        return;
    }
    done();
};

const open = (currentProps?: CurrentProps) => {
    if (currentProps) {
        for (const key in currentProps) {
            // @ts-ignore
            _currentProps[key] = currentProps[key];
        }
    } else {
        for (const key in _currentProps) {
            // @ts-ignore
            _currentProps[key] = undefined;
        }
    }
    visible.value = true;
};
const close = () => {
    visible.value = false;
};
defineExpose<DialogLayoutExpose>({ open, close });
</script>

<template>
    <el-dialog
        v-bind="props"
        v-model="visible"
        :title="_title"
        :width="props.width || '570'"
        align-center
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        append-to-body
        :before-close="beforeClose"
        :modal="true"
    >
        <template v-if="$slots.header" #header>
            <slot name="header"></slot>
        </template>

        <div class="overflow-auto" style="max-height: calc(100vh - 240px)">
            <template v-if="_content">
                {{ _content }}
            </template>
            <slot v-else></slot>
        </div>
        <template #footer>
            <slot name="footer">
                <!--                取消按钮-->
                <div class="inline-block" @click="onClose">
                    <slot name="cancelButton">
                        <el-button :disabled="confirmLoading || cancelDisabled">
                            {{ _cancelText }}
                        </el-button>
                    </slot>
                </div>

                <!--                确定按钮-->
                <div class="inline-block ml-[12px]" @click="onConfirm">
                    <slot name="confirmButton">
                        <el-button
                            type="primary"
                            :loading="confirmLoading"
                            :disabled="confirmDisabled"
                        >
                            {{ _confirmText }}
                        </el-button>
                    </slot>
                </div>
            </slot>
        </template>
    </el-dialog>
</template>
