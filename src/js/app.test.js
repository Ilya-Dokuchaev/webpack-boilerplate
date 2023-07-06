import {counter} from "./app.js";

test('should be not falsy,', () => {
    expect(counter).not.toBeNull()
    expect(counter).not.toBeFalsy()
})