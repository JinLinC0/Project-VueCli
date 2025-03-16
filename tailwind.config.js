/** @type {import('tailwindcss').Config} */
export default {
  // 提取src文件夹中的下述文件进行处理，分析这些文件使用了哪些类
  // 再将这些类进行从tailwindcss中提取，用什么提取什么，防止打包的文件过大
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
}

