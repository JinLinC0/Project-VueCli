import Axios from "./Axios";

const http = new Axios({
    baseURL: '/api',    // 接口地址前缀
    timeout: 10000,
    headers: {}
});

export { http }