// 函数类型的接口
interface IConcat {
    (
        targetDir: string,
        destination: string,
        callback: (err: any) => void,
    ): void;
}
// 或者写成 类型别名的形式
// type IConcat = (targetDir: string, destination: string, callback: (err: string) => void) => void;