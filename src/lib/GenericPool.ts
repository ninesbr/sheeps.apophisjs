export type GenericPoolResult<T> = { obj: T, err?: Error };

export interface GenericPool<T> {
    init(): Promise<void>;
    checkOut(): Promise<GenericPoolResult<T>>;
    checkIn(obj: T): void;
    validate(obj: T): boolean;
    close(obj: T): void;
    create(): Promise<GenericPoolResult<T>>;
    destroyAllNow(): Promise<void>;
    size(): number;
}