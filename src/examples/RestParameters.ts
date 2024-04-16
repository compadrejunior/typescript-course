namespace RestParameters {
  function sum(...numbers: number[]) {
    let total = 0;
    for (let number of numbers) {
      total += number;
    }
    return total;
  }

  console.log(sum(1, 2, 3)); // Output: 6
  console.log(sum(4, 5, 6, 7)); // Output: 22

  function greetNames(greeting: string, ...names: string[]) {
    for (let name of names) {
      console.log(`${greeting}, ${name}!`);
    }
  }

  greetNames('Hello', 'John', 'Jane', 'Alice');
  // Output:
  // Hello, John!
  // Hello, Jane!
  // Hello, Alice!
}
