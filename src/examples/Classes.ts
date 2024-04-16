// Define a class
class Person {
  // Properties
  name: string;
  age: number;

  // Constructor
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  // Method
  greet() {
    return `Hello, my name is ${this.name} and I am ${this.age} years old.`;
  }
}

// Create an object of the class
const person1 = new Person('Alice', 25);

// Access object properties and call methods
console.log(person1.name); // Output: "Alice"
console.log(person1.greet()); // Output: "Hello, my name is Alice and I am 25 years old."
