该文件夹用于存放一些路由相关的文件
- index.ts：路由配置的入口文件
- routes.ts：静态路由配置文件
- autoload.ts：自动加载路由，目前只支持layouts和views文件夹，views文件夹中的.vue文件作为子路由（和layouts同子目录的生效）
- guard.ts：路由守卫，对访问时进行拦截