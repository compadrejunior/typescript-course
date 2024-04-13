namespace AbstractClasses {
  abstract class Animal {
    abstract makeSound(): void;

    move(): void {
      console.log('Moving...');
    }
  }

  class Cat extends Animal {
    makeSound(): void {
      console.log('Meow');
    }
  }

  let cat = new Cat();
  cat.makeSound(); // Output: Meow
  cat.move(); // Output: Moving...
}
