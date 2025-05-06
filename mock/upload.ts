import { MockMethod } from "vite-plugin-mock";

// 模拟后台返回的数据
export default [
    {
        url: '/api/upload/image',
        method: 'post',
        response: () => {
            return {
                code: 200,
                message: '上传成功',
                type: 'success',
                data: {
                    url: "/images/vuecli.svg",
                }
            }
        }
    }
] as MockMethod[];