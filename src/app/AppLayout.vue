<script setup lang="ts">
import { AppLayoutProps } from './types';

withDefaults(defineProps<AppLayoutProps>(), {
    headerHeight: 60,
    headerBgColor: '#fff',
    menuWidth: 200,
    menuFullHeight: false,
    menuBgColor: '#fff',
    contentPadding: 16,
    contentBgColor: '#f5f7fb',
    contentScroll: false,
});
</script>

<template>
    <div
        class="app__header"
        :style="{ height: `${headerHeight}px`, backgroundColor: headerBgColor }"
    >
        <div
            v-if="menuFullHeight"
            :style="{ width: `${menuWidth}px` }"
            class="app__header__placeholder"
        ></div>
        <slot name="header">
            <slot name="headerLeft" />
            <div class="app__header__spacer"></div>
            <slot name="headerRight" />
        </slot>
    </div>
    <div
        class="app__menu-content__wrapper"
        :style="{
            minHeight: `calc(100vh - ${headerHeight}px)`,
        }"
    >
        <div
            class="app__menu__wrapper"
            :style="[
                {
                    width: `${menuWidth}px`,
                    backgroundColor: menuBgColor,
                },
                menuFullHeight
                    ? {
                          height: '100vh',
                          marginTop: `-${headerHeight}px`,
                      }
                    : {},
            ]"
        >
            <div
                class="app__menu__inner"
                :style="{
                    width: `${menuWidth}px`,
                }"
            >
                <slot name="menu" />
            </div>
        </div>
        <div
            class="app__content__wrapper"
            :style="{
                backgroundColor: contentBgColor,
            }"
        >
            <div
                class="app__content__inner"
                :style="{
                    padding: `${contentPadding}px`,
                }"
            >
                <div
                    class="flex flex-col"
                    :style="{
                        height: contentScroll ? 'auto' : '100%',
                    }"
                >
                    <slot name="content" />
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.app {
    &__header {
        @apply flex flex-row items-center justify-between w-full bg-gray-100;

        &__spacer {
            @apply flex-grow;
        }

        &__placeholder {
            @apply transition-[width];
        }
    }

    &__menu-content__wrapper {
        @apply flex flex-row items-stretch justify-between;
    }

    &__menu {
        &__wrapper {
            @apply relative transition-[width] overflow-hidden;
        }

        &__inner {
            @apply absolute inset-0 overflow-y-auto;
        }
    }

    &__content {
        &__wrapper {
            @apply relative grow bg-gray-300;
        }

        &__inner {
            @apply absolute inset-0 overflow-y-auto;
        }
    }
}

::-webkit-scrollbar {
    /* 滚动条整体样式 */
    width: 6px; /* 高宽分别对应横竖滚动条的尺寸 */
    height: 6px;
}

::-webkit-scrollbar-thumb {
    /* 滚动条里面小方块 */
    border-radius: 10px;
    box-shadow: inset 0 0 5px #c1c1c1;
    background: #c1c1c1;
}

::-webkit-scrollbar-track {
    /* 滚动条里面轨道 */
    box-shadow: inset 0 0 5px #ededed;
    border-radius: 10px;
    background: #ededed;
}
</style>
