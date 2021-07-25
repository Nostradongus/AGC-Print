const { add } = require('../middleware/add');

describe('1 + 1 = 2', () => {
  it('Pass Test', () => {
    expect(add(1, 1)).toBe(2);
  });
});
