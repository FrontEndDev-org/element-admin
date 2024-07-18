import { createApp } from 'vue';
import './tailwind.scss';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import Playground from './Playground.vue';

createApp(Playground).use(ElementPlus).mount('#app');
