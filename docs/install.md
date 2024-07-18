# 安装与使用

## 1. 安装 element-plus

参考 [官方文档](https://element-plus.org/zh-CN/guide/quickstart.html) 安装 element-plus

## 2. 安装 tailwindcss

参考 [官方文档](https://tailwindcss.com/docs/guides/vue-3-vite) 安装 tailwindcss

然后增加一行配置到 `tailwind.config.js` 文件中：

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './index.html',
        './src/**/*.{vue,js,ts,jsx,tsx}',
        './node_modules/element-admin/**/*.{vue,js,ts,jsx,tsx}', // [!code ++]
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};
```

## 3. 安装 element-admin

::: code-group

```shell [yarn]
yarn add element-admin --registry http://192.168.23.184:4873
```

```shell [npm]
npm install element-admin --registry http://192.168.23.184:4873
```

:::

::: warning
目前仍在 alpha 阶段，安装时需要指定最新版本，如

```shell
yarn add element-admin@latest --registry http://192.168.23.184:4873
```

:::

## 4. 样式引入

在 `src/main.ts` 中引入样式

```typescript
// 以下样式需要在 tailwindcss 之后引入
import 'element-admin/style.css';
// 如果修改了 elment-plus 的 namespace 则引入以下样式
import 'element-plus/theme-chalk/src/index.scss';
// 否则引入以下样式
import 'element-plus/dist/index.css';
```

::: warning
无论你是全量还是按需引入 element-plus，都需要全量引入其样式，
这是由一些暂时未解决的技术问题导致的，后续会解决这个问题。
:::

## 5. 开始开发

```vue
<script lang="ts" setup>
import { AppLayout } from 'element-admin';
</script>

<template>
    <AppLayout
        :menu-width="200"
        :header-height="50"
        :content-padding="16"
        menu-full-height
        content-bg-color="white"
    >
        <template #headerLeft>
            <!-- 顶部左侧内容 -->
        </template>
        <template #headerRight>
            <!-- 顶部右侧内容 -->
        </template>
        <template #menu>
            <!-- 菜单内容 -->
        </template>
        <template #content>
            <router-view />
        </template>
    </AppLayout>
</template>
```
