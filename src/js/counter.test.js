import {Counter as CounterTest} from "./counter.js";

describe('Counter method as :', function () {
    let counter = new CounterTest(0);
    beforeEach(function () {
        return counter = new CounterTest(0);
    });
    test('increment should be', () => {
        counter.increment();
        expect(counter.getCounter()).toEqual(1);
    });
    test('decrement should be', () => {
        counter.decrement();
        expect(counter.getCounter()).toEqual(-1);
    });
});