interface IDate {
    // 过期时间，该字段是可选的
    expire?: number,
    data: any
}

export default {
    // 在本地存储中设置数据
    set(key: string, data: any, expire?: number): void {
        // 创建一个缓存数据对象，将数据存储到该对象中
        let cache: IDate = { data }
        if (expire) {
            cache.expire = new Date().getTime() + data.expire * 1000   // 将自定义的过期时间转换为秒
        }
        // 将缓存数据压入，存储到本地的localStorage中
        localStorage.setItem(key, JSON.stringify(cache));
    },
    // 从本地存储中获取数据，如果数据过期了，则删除该数据，并返回null
    get(key: string): any {
        const cacheStore = localStorage.getItem(key);
        if (cacheStore) {
            const cache = JSON.parse(cacheStore);
            const expire = cache?.expire;
            // 如果过期时间存在，再进行比较是否过期
            // 如果过期时间小于当前时间，说明数据过期了，我们应该将其删除
            if (expire && expire < new Date().getTime()) {
                localStorage.removeItem(key);
                return null;
            }
            // 否则的话就将数据返回出去
            return cache.data;
        }
        return null;
    },
    // 删除本地存储中的数据（用于退出登录时删除本地保存的数据）
    remove(key: string): void {
        localStorage.removeItem(key);
    }
}