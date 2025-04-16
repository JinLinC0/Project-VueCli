import { Random } from "mockjs";
import { MockMethod } from "vite-plugin-mock";

// 模拟后台返回的数据
// 一个简单的测试案例
export default [
    {
        url: '/api/info',
        method: 'get',
        response: () => {
            return {
                code: 200,
                message: '请求成功',
                type: 'success',
                data: {
                    name: "jlc",
                    age: 24,
                    avatar: "https://img2.baidu.com/it/u=3245138663,4138288476&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
                }
            }
        }
    },
    {
        url: '/api/login',
        method: 'post',
        response: () => {
            return {
                code: 200,
                message: '登录成功',
                type: 'success',
                data: {
                    token: Random.string(10),   // 模拟生成一个10位的随机字符串作为token
                }
            }
        }
    }
] as MockMethod[];