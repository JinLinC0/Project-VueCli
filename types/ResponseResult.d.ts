interface ResponseResult <T>{
    code: number,
    message: string,
    type: 'success' | 'error',
    data: T  // 泛型，表示返回的数据类型是不确定的（类型是可变的）
}