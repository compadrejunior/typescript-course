const greet = () => {
  console.log('Hello!');
};
greet(); // Output: Hello!

const sumValues = (a: number, b: number) => {
  return a + b;
};

console.log(sumValues(3, 5)); // Output: 8

const multiply = (a: number, b: number) => a * b;

console.log(multiply(2, 4)); // Output: 8

const square = (x: number) => x * x;

console.log(square(5)); // Output: 25

const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map((num) => num * 2);

console.log(doubled);
