namespace InterfacesAsFunctionTypes {
  interface MathOperation {
    (a: number, b: number): number;
  }

  let add: MathOperation = function (a: number, b: number): number {
    return a + b;
  };

  let multiply: MathOperation = function (a: number, b: number): number {
    return a * b;
  };

  console.log(add(5, 3)); // Output: 8
  console.log(multiply(5, 3)); // Output: 15
}
