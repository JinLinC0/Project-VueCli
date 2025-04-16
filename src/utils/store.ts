interface IDate {
    // 过期时间，该字段是可选的
    expire?: number,
    [key: string]: any
}

export default {
    // 在本地存储中设置数据
    set(key: string, data: IDate): void {
        if (data.expire) {
            data.expire = data.expire * 1000 + new Date().getTime()
        }
        // 将数据压入，存储到本地的localStorage中
        localStorage.setItem(key, JSON.stringify(data));
    },
    // 从本地存储中获取数据，如果数据过期了，则删除该数据，并返回null
    get(key: string): IDate | null {
        const item = localStorage.getItem(key);
        if (item) {
            const data = JSON.parse(item);
            const expire = data?.expire;
            // 如果过期时间小于当前时间，说明数据过期了，我们应该将其删除
            if (expire < new Date().getTime()) {
                localStorage.removeItem(key);
                return null;
            }
            // 否则的话就将数据返回出去
            return data;
        }
        return null;
    }
}