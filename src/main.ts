import { createApp } from 'vue'
import App from '@/App.vue'
import router, { setupRouter } from '@/router'
import { setupPlugins } from '@/plugins'
import '@/styles/global.scss'
import 'animate.css'  // 动画库样式的全局引入
import "@toast-ui/editor/dist/toastui-editor.css";  // tosat-ui-editor编辑器样式的全局引入

async function bootstrap() {
    const app = createApp(App)
    // app.use(router)   // 注册路由
    // 设置插件，统一在setupPlugins()函数中进行管理，将app应用程序传递过去
    setupPlugins(app)
    // 优化路由定义，使用setupRouter函数注册路由
    setupRouter(app)
    // 当路由全部挂载好后，再渲染页面
    await router.isReady()
    app.mount('#app')
}

bootstrap()