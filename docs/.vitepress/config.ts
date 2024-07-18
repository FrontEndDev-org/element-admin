import {
    containerPreview,
    componentPreview,
} from '@vitepress-demo-preview/plugin';
import path from 'node:path';
import AutoImport from 'unplugin-auto-import/vite';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { defineConfig } from 'vitepress';

export default defineConfig({
    base: '/element-admin/',
    vite: {
        plugins: [
            vueJsx(),
            AutoImport({
                imports: ['vue'],
            }),
        ],
        resolve: {
            alias: {
                'element-admin': path.resolve(__dirname, '../../src/'),
            },
        },
    },
    themeConfig: {
        siteTitle: 'Element Admin',
        search: {
            provider: 'local',
        },
        sidebar: [
            {
                text: 'element-admin',
                items: [
                    { text: '简介', link: '/' },
                    { text: '安装与使用', link: '/install' },
                    { text: '快速开始', link: '/quick-start' },
                    { text: '更新日志', link: '/changelog' },
                ],
            },
            {
                text: '组件',
                items: [
                    {
                        text: 'App 应用',
                        items: [
                            {
                                text: 'AppLayout 应用布局',
                                link: '/components/app/app-layout/',
                            },
                        ],
                    },
                    {
                        text: 'Container 容器',
                        items: [
                            {
                                text: 'GrowScrollContainer 弹性滚动容器',
                                link: '/components/container/grow-scroll-container',
                            },
                        ],
                    },
                    {
                        text: 'Navigation 导航',
                        items: [
                            {
                                text: 'TabBar 标签栏',
                                link: '/components/navigation/tab-bar',
                            },
                        ],
                    },
                    {
                        text: 'Dialog 对话框',
                        items: [
                            {
                                text: 'DialogLayout 对话框布局',
                                link: '/components/dialog/dialog-layout',
                            },
                        ],
                    },
                    {
                        text: 'Form 表单',
                        items: [
                            {
                                text: 'FormItemSuites 表单项套件',
                                link: '/components/form/form-item-suites/',
                            },
                        ],
                    },
                    {
                        text: 'Table 表格',
                        items: [
                            {
                                text: 'TableLayout 表格布局',
                                link: '/components/table/table-layout',
                            },
                            {
                                text: 'Operators&Filters 顶部操作和过滤器',
                                link: '/components/table/table-operators-filters',
                            },
                            {
                                text: 'Actions&Dialog 操作列和对话框',
                                link: '/components/table/table-actions-dialogs',
                            },
                        ],
                    },
                    {
                        text: 'Other 其他',
                        items: [
                            {
                                text: 'OverTooltip 溢出提示',
                                link: '/components/other/over-tooltip',
                            },
                        ],
                    },
                ],
            },
            { text: '场景示例' },
        ],
    },
    markdown: {
        config(md) {
            md.use(containerPreview);
            md.use(componentPreview);
        },
    },
    outDir: '../docs-public',
});
