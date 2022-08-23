export default class PQMIN<T> {
    #private;
    MAX_SIZE: number;
    get size(): number;
    insert(priority: number, entity: T): void;
    extract_min(): {
        priority: number;
        entity: T;
    };
    get_min(): {
        priority: number;
        entity: T;
    };
    remove(i: number): {
        priority: number;
        entity: T;
    } | undefined;
}
