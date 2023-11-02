
export declare type Message<T extends string | number | symbol> = {
    type: string,
    data: Partial<{
        [K in T]: any
    }>
};