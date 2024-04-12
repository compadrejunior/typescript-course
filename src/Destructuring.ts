const numberList = [1, 2, 3];
const [a, b, c] = numberList;

console.log(a); // Output: 1
console.log(b); // Output: 2
console.log(c); // Output: 3

const colors = ['red', 'green', 'blue', 'yellow'];
const [primaryColor, secondaryColor, ...additionalColors] = colors;

console.log(primaryColor); // Output: "red"
console.log(secondaryColor); // Output: "green"
console.log(additionalColors); // Output: ["blue", "yellow"]

const newPerson = { firstName: 'John', age: 50 };
const { firstName, age } = newPerson;

console.log(firstName); // Output: "John"
console.log(age); // Output: 30

const book = {
  title: 'JavaScript Basics',
  author: 'Jane Doe',
  year: 2022,
  genre: 'Programming',
};
const { title, author, ...otherDetails } = book;

console.log(title); // Output: "JavaScript Basics"
console.log(author); // Output: "Jane Doe"
console.log(otherDetails); // Output: { year: 2022, genre: "Programming" }
