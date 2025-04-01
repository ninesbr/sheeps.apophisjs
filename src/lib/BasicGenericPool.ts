import { GenericPool, GenericPoolResult } from "./GenericPool";
import { Comparable } from "./Comparable";
import { MyQueue } from "./Queue";

export abstract class BasicGenericPool<T extends Comparable<T>> implements GenericPool<T> {
    connections: MyQueue<T> = new MyQueue<T>();
    initialSize: number = 0;
    maxSize: number = 0;

    constructor(initialSize: number, maxSize: number) {
        this.initialSize = initialSize;
        this.maxSize = maxSize;
    }

    size(): number {
        return this.connections.size();
    }

    destroyAllNow(): Promise<void> {
        for (let i = 0; i < this.size(); i++) {
            let obj = this.connections.dequeue();
            this.close(obj);
        }
        return;
    }

    abstract validate(obj: T): boolean;

    abstract close(obj: T): void;

    abstract create(): Promise<GenericPoolResult<T>>;

    async init(): Promise<void> {
        for (let i = 0; i < this.initialSize; i++) {
            let result = await this.create();
            if (result.err) {
                throw result.err;
            }
            this.connections.enqueue(result.obj);
        }
    }

    async checkOut(): Promise<GenericPoolResult<T>> {
        if (this.size() < this.initialSize) {
            let result = await this.create();
            if (result.err) {
                return result;
            }
            this.connections.enqueue(result.obj);
            return result;
        }

        let result = this.connections.dequeue();
        if (!this.validate(result)) {
            this.close(result);
            const r = await this.create();
            if (r.err) {
                return r;
            }
            result = r.obj;
        }

        this.connections.enqueue(result);
        return { obj: result };
    }

    checkIn(obj: T): void {
        this.connections.enqueue(obj);
    }
}