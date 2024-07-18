export const deepClone = <T>(obj: T): T => {
    // #endregion deepClone
    if (!['object', 'symbol'].includes(typeof obj)) return obj;

    // 检查set类型 typeof Set === ‘object’
    if (obj instanceof Set) {
        return new Set(
            Array.from(obj).map((item) => {
                return deepClone(item);
            })
        ) as T;
    }

    // 类型检查Symbol 进行深拷贝
    if (typeof obj === 'symbol') {
        return obj;
    }

    // TODO 把lodash的deepClone方法拷贝过来
    return JSON.parse(JSON.stringify(obj));
};
