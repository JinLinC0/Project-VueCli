import userApi, { User } from "@/api/userApi";
import { CacheEnum } from "@/enum/cacheEnum";
import store from "@/utils/store";
import { defineStore } from "pinia";

export default defineStore("user", {
    state: () => {
        return {
            info: {} as null | User,
        }
    },
    actions: {
        // 获取用户信息
        async getUserInfo() {
            // 如果本地缓存中存在login_token时，再进行用户资料的获取
            if (store.get(CacheEnum.TOKEN_NAME)) {
                // 通过api获取用户信息
                const res = await userApi.info();
                this.info = res.data;
            }
        },
    }
})