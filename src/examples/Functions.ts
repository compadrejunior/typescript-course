// Function add
function sum(n1: number, n2: number) {
  return n1 + n2;
}
function printResult(num: number): void {
  console.log('Result: ' + num);
}
printResult(sum(5, 12));

// Function type expressions
let combineValues: (a: number, b: number) => number;
// TypeScript will complain when the function types are different
// combineValues = printResult;

// To fix this, assign the proper function type
combineValues = sum;
console.log(combineValues(8, 8));
