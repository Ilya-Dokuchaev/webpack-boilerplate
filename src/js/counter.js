export default class Counter {
    constructor(n) {
        this.counter = n;
    }

    getCounter() {
        return this.counter;
    }

    increment() {
        this.counter++;
    }

    decrement() {
        this.counter--;
    }
}