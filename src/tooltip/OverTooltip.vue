<script setup lang="ts">
import {
    defineProps,
    onMounted,
    ref,
    watch,
    nextTick,
    computed,
    CSSProperties,
    camelize,
    useSlots,
} from 'vue';
import { ElTooltip } from 'element-plus';
import { isClient } from '@vueuse/core';
import { deepClone } from '../utils';

interface ToolTipProps {
    content?: string;
    line?: number | null;
    width?: number | null;
}

// @ts-ignore
let props = withDefaults(defineProps<ToolTipProps>(), {
    content: '',
    line: null,
    width: null,
});

// 获取slots内容
const slotContent: any = useSlots();

// 拷贝自 element-plus 源码
const getStyle = (
    element: HTMLElement,
    styleName: keyof CSSProperties
): string => {
    if (!isClient || !element || !styleName) return '';

    let key = camelize(styleName);
    if (key === 'float') key = 'cssFloat';
    try {
        const style = (element.style as any)[key];
        if (style) return style;
        const computed: any = document.defaultView?.getComputedStyle(
            element,
            ''
        );
        return computed ? computed[key] : '';
    } catch {
        return (element.style as any)[key];
    }
};

onMounted(() => {
    // 检查是否传值
    if (!props.content && !slotContent?.default)
        return console.error('content or slots is required: overToolTip');
    computedIsShowOverToolTip();
});

// 根元素组件
const overTooltipRef = ref();
const tooltipRef = ref(null);
// 是否展示tooltip
const isShowTooltip = ref(false);

// 监听slots变化
watch(
    () => slotContent.default(),
    () => {
        nextTick(() => computedIsShowOverToolTip());
    },
    {
        // immediate: true,
        deep: true,
    }
);

// 监听content变化
watch(
    () => props.content,
    () => {
        nextTick(() => computedIsShowOverToolTip());
    },
    {
        // immediate: true,
        deep: true,
    }
);

// 监听width变化
watch(
    () => props.width,
    () => {
        nextTick(() => computedIsShowOverToolTip());
    }
);

// 监听line
watch(
    () => props.line,
    () => {
        nextTick(() => computedIsShowOverToolTip());
    }
);

const computedIsShowOverToolTip = () => {
    if (!overTooltipRef.value) return false;
    const overToolTip: HTMLElement = overTooltipRef.value;
    overToolTip.style.whiteSpace = 'nowrap';

    const padding =
        (parseInt(getStyle(overToolTip, 'paddingLeft'), 10) || 0) +
        (parseInt(getStyle(overToolTip, 'paddingRight'), 10) || 0);

    // 创建range对象 用于判定长度
    const range = document.createRange();
    range.setStart(overToolTip, 0);
    range.setEnd(overToolTip, 1);
    const rangeWidth = range.getBoundingClientRect().width + padding;

    let line = deepClone(props.line);

    // 判断内容长度是否大于展示长度
    isShowTooltip.value = !line
        ? rangeWidth > overToolTip?.offsetWidth ||
          overToolTip?.scrollWidth > overToolTip?.offsetWidth
        : rangeWidth > overToolTip.offsetWidth * +line ||
          overToolTip.scrollWidth > overToolTip.offsetWidth * +line;

    overToolTip.style.whiteSpace = 'normal';
};

// 设置多行与宽度
let overToolTipStyle = computed(() => {
    return {
        width: props.width ? `${props.width}px` : '',
        lineClamp: props.line ?? 1,
        webkitLineClamp: props.line ?? 1,
    };
});
</script>

<template>
    <!--    无toolTip展示-->
    <span
        v-if="!isShowTooltip"
        ref="overTooltipRef"
        :class="[
            !line ? 'overToolTipOnceLine' : 'overToolTipMoreLines',
            'overToolTipRoot',
        ]"
        :style="overToolTipStyle"
    >
        <slot ref="defaultSlotRef">
            {{ content }}
        </slot>
    </span>
    <template v-else>
        <el-tooltip v-bind="$attrs" ref="tooltipRef" placement="top-start">
            <template #content>
                <slot ref="defaultSlotRef">
                    {{ content }}
                </slot>
            </template>

            <span
                ref="overTooltipRef"
                :class="[
                    !line ? 'overToolTipOnceLine' : 'overToolTipMoreLines',
                    'overToolTipRoot',
                ]"
                :style="overToolTipStyle"
            >
                <slot ref="defaultSlotRef">
                    {{ content }}
                </slot>
            </span>
        </el-tooltip>
    </template>
</template>

<style scoped lang="scss">
.overToolTipRoot {
    cursor: pointer;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
}

.overToolTipOnceLine {
    white-space: nowrap !important;
    display: inline-block;
}

.overToolTipMoreLines {
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>
