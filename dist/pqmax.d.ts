export declare const parent: (i: number) => number;
export declare const left_child: (i: number) => number;
export declare const right_child: (i: number) => number;
export declare const swap: (queue: any[], i: number, j: number) => void;
export default class PQMAX<T> {
    #private;
    MAX_SIZE: number;
    get size(): number;
    insert(priority: number, entity: T): void;
    extract_max(): {
        priority: number;
        entity: T;
    };
    get_max(): {
        priority: number;
        entity: T;
    };
    remove(i: number): {
        priority: number;
        entity: T;
    } | undefined;
}
