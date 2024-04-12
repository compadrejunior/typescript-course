function sayHello(name = 'Guest') {
  console.log(`Hello, ${name}!`);
}

sayHello(); // Output: Hello, Guest!
sayHello('John'); // Output: Hello, John!

function calculateTotal(price: number, taxRate = getTaxRate()) {
  return price + price * taxRate;
}

function getTaxRate() {
  return 0.1; // 10% tax rate
}

console.log(calculateTotal(100)); // Output: 110
