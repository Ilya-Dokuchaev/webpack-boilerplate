/*
 * Copyright (c) 2023. MIT license
 */

import {jest} from '@jest/globals';
import counter from "./app.js";

jest.mock('./app.js');

test('should be not falsy,', () => {
    expect(counter).not.toBeNull();
    expect(counter).not.toBeFalsy();
});