import axios, { AxiosRequestConfig } from "axios"

// 对axios进行配置
export default class Axios {
    private instance
    // 传递axios的配置
    constructor(config: AxiosRequestConfig) {
        this.instance = axios.create(config)

        this.interceptors()
    }

    // 接收请求
    public async request<T, D = ResponseResult<T>>(config: AxiosRequestConfig): Promise<D> {
        // 去掉data的一层包裹，使用response.result.age带有即可
        return new Promise(async(resolve, reject) => {
            try {
                const response = await this.instance.request<D>(config)
                resolve(response.data)
            } catch (error) {
                reject(error)
            }
        })
    }

    // 添加拦截器
    private interceptors() {
        // 请求拦截
        this.interceptorsRequest()
        // 响应拦截
        this.interceptorsResponse()
    }

    // 请求拦截
    private interceptorsRequest() {
        this.instance.interceptors.request.use(
            config => {
                return config
            },
            error => {
                return Promise.reject(error)
            }
        )
    }

    // 响应拦截
    private interceptorsResponse() {
        this.instance.interceptors.response.use(
            response => {
                return response
            },
            error => {
                return Promise.reject(error)
            }
        )
    }
}