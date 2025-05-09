import { Random } from "mockjs";
import { MockMethod } from "vite-plugin-mock";

// 模拟后台返回的文章列表数据
export default [
    {
        url: '/api/article',
        method: 'get',
        response: () => {
            return {
                code: 200,
                message: '请求成功',
                status: 'success',
                data: new Array(10).fill(0).map((index) => {
                    return {
                        id: index + 1,
                        title: Random.ctitle(),    // 随机生成标题
                        content: Random.cparagraph(),  // 随机生成内容
                    }
                })
            }
        }
    }
] as MockMethod[];