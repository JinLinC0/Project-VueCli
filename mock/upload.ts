import { MockMethod } from "vite-plugin-mock";

// 模拟后台返回的数据
export default [
    {
        url: '/api/upload/image',
        method: 'post',
        response: () => {
            return {
                code: 200,
                errno: 0,   // wangeditor 0 表示上传成功，1 表示上传失败
                message: '上传成功',
                status: 'success',
                data: {
                    url: "/images/vuecli.svg",
                }
            }
        }
    }
] as MockMethod[];