const fruits = ['apple', 'banana'];
const vegetables = ['carrot', 'broccoli'];
const combined = [...fruits, ...vegetables];

console.log(combined); // Output: ["apple", "banana", "carrot", "broccoli"]

const person = { name: 'John', age: 30 };
const copiedPerson = { ...person };

console.log(copiedPerson); // Output: { name: "John", age: 30 }

const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };
const merged = { ...obj1, ...obj2 };

console.log(merged); // Output: { a: 1, b: 2, c: 3, d: 4 }
