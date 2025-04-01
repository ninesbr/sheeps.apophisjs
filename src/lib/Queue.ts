import { Comparable } from "./Comparable";

export class MyQueue<T extends Comparable<T>> {
    private queue: T[] = [];

    // Add an item to the queue or update its reference if it already exists
    enqueue(item: T): boolean {
        const index = this.queue.findIndex(existingItem => existingItem.equals(item));
        if (index !== -1) {
            // Item already exists, update its reference
            this.queue[index] = item;
            return true; // Item updated
        }
        this.queue.push(item);
        return true; // Item successfully added
    }

    // Remove and return the first item in the queue
    dequeue(): T | undefined {
        return this.queue.shift();
    }

    // Check if the queue is empty
    isEmpty(): boolean {
        return this.queue.length === 0;
    }

    // Get the size of the queue
    size(): number {
        return this.queue.length;
    }

    // Check if the queue contains a specific item
    contains(item: T): boolean {
        return this.queue.some(existingItem => existingItem.equals(item));
    }
}