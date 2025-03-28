该文件夹用于存放一些全局的类型声明文件，为了使其有更好的提示支持

在`tsconfig.node.json`和`tsconfig.app.json`引入如下内容，使配置可以加载到`types`文件夹中的所有文件：

```json
"include": [
    "types/**/*.d.ts",
]
```

- `viteEnv.d.ts`：`.env`配置项类型的声明文件
- `module.d.ts`：总的配置声明文件
