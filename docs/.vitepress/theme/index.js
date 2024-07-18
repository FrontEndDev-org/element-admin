import DefaultTheme from 'vitepress/theme';
import {
    AntDesignContainer,
    // ElementPlusContainer,
    // NaiveUIContainer,
} from '@vitepress-demo-preview/component';
import '@vitepress-demo-preview/component/dist/style.css';
import './tailwind.scss';
import './reset.css';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

export default {
    ...DefaultTheme,
    enhanceApp(ctx) {
        ctx.app.component('demo-preview', AntDesignContainer);
        ctx.app.use(ElementPlus);
        for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
            ctx.app.component(key, component);
        }
        DefaultTheme.enhanceApp(ctx);
    },
};
