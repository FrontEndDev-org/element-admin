import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
// import Components from 'unplugin-vue-components/vite';
// import Icons from 'unplugin-icons/vite';
// import IconsResolver from 'unplugin-icons/resolver';
// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import dts from 'vite-plugin-dts';
import { visualizer } from 'rollup-plugin-visualizer';
// @ts-ignore
// import ElementPlus from 'unplugin-element-plus/vite';
import vueJsx from '@vitejs/plugin-vue-jsx';

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        port: 4000,
        host: '0.0.0.0',
    },
    build: {
        lib: {
            // Could also be a dictionary or array of multiple entry points
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'ElementAdmin',
            // the proper extensions will be added
            fileName: 'element-admin',
        },
        rollupOptions: {
            // 确保外部化处理那些你不想打包进库的依赖
            external: ['vue', 'element-plus', '@element-plus/icons-vue'],
            output: {
                // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
                globals: {
                    vue: 'Vue',
                    'element-plus': 'ElementPlus',
                    '@element-plus/icons-vue': 'IconsVue',
                },
            },
        },
    },
    plugins: [
        vueJsx(),
        vue(),
        AutoImport({
            // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
            imports: ['vue'],
            // resolvers: [
            //     // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
            //     ElementPlusResolver(),
            //     // 自动导入图标组件
            //     IconsResolver({
            //         prefix: 'Icon',
            //     }),
            // ],
            eslintrc: {
                enabled: true,
            },
            // cache: true,
        }),
        // Components({
        //     resolvers: [
        //         // 自动注册图标组件
        //         IconsResolver(),
        //         // 自动导入 Element Plus 组件
        //         ElementPlusResolver({
        //             importStyle: 'sass',
        //         }),
        //     ],
        // }),
        // Icons({
        //     autoInstall: true,
        // }),
        dts({
            include: ['src'],
        }),
        visualizer(),
    ],
});
