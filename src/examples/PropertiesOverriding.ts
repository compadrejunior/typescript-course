namespace PropertiesOverriding {
  class Animal {
    sound: string;

    constructor(sound: string) {
      this.sound = sound;
    }

    makeSound(): void {
      console.log(this.sound);
    }
  }

  class Cat extends Animal {
    sound: string;

    constructor() {
      super('Meow');
      this.sound = 'Purr';
    }

    makeSound(): void {
      console.log(this.sound);
    }
  }

  let cat = new Cat();
  cat.makeSound(); // Output: Purr
}
