import { CacheEnum } from "@/enum/cacheEnum"
import router from "@/router"
import store from "@/utils/store"
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
        }) as Promise<D>
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
                config.headers.Authorization = "Bearer " + store.get(CacheEnum.TOKEN_NAME);
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
                switch (error.response.status) {
                    // token过期出现的错误，需要重新登录
                    case 401:
                        store.remove(CacheEnum.TOKEN_NAME)
                        router.push({ name: 'login' })
                        break
                }
                return Promise.reject(error)
            }
        )
    }
}