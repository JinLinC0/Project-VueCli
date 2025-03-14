import { createApp } from 'vue'
import App from './App.vue'
import router, { setupRouter } from './router'

async function bootstrap() {
    const app = createApp(App)
    // app.use(router)   // 注册路由
    // 优化路由定义，使用setupRouter函数注册路由
    setupRouter(app)
    // 当路由全部挂载好后，再渲染页面
    await router.isReady()
    app.mount('#app')
}

bootstrap()