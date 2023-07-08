/*
 * Copyright (c) 2023. MIT license
 */

import Counter from "./counter.js";

describe('Counter method as :', function () {
    let counter = new Counter(0);
    beforeEach(function () {
        return counter = new Counter(0);
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