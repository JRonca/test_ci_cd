const { add, subtract, multiply, divide } = require('./calculator');

describe('Calculator', () => {
  describe('add', () => {
    it('should add two positive numbers', () => {
      expect(add(2, 3)).toBe(5);
    });

    it('should add two negative numbers', () => {
      expect(add(-2, -3)).toBe(-5);
    });

    it('should add a positive number and a negative number', () => {
      expect(add(5, -3)).toBe(2);
    });
  });

  describe('subtract', () => {
    it('should subtract two numbers', () => {
      expect(subtract(5, 3)).toBe(2);
    });

    it('should subtract two negative numbers', () => {
      expect(subtract(-2, -3)).toBe(1);
    });
  });

  describe('multiply', () => {
    it('should multiply two positive numbers', () => {
      expect(multiply(3, 4)).toBe(12);
    });

    it('should multiply a positive number and a negative number', () => {
      expect(multiply(3, -4)).toBe(-12);
    });

    it('should return zero when multiplying by zero', () => {
      expect(multiply(5, 0)).toBe(0);
    });
  });

  describe('divide', () => {
    it('should divide two numbers', () => {
      expect(divide(10, 2)).toBe(5);
    });

    it('should throw an error when dividing by zero', () => {
      expect(() => divide(10, 0)).toThrow('Division by zero is not allowed');
    });

    it('should divide two decimal numbers', () => {
      expect(divide(7, 2)).toBe(3.5);
    });
  });
});
