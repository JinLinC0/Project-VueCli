import userApi, { User } from "@/api/userApi";
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
            // 通过api获取用户信息
            const res = await userApi.info();
            this.info = res.data;
        },
    }
})