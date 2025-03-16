import { MockMethod } from "vite-plugin-mock";

// 一个简单的测试案例
export default [
    {
        url: '/api/get',
        response: () => {
            return {
                code: 0,
                data: {
                    name: "jlc"
                }
            }
        }
    }
] as MockMethod[];