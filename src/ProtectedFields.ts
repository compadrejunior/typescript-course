namespace ProtectedFields {
  class Animal {
    protected sound: string;

    constructor(sound: string) {
      this.sound = sound;
    }

    makeSound(): void {
      console.log(this.sound);
    }
  }

  class Cat extends Animal {
    constructor() {
      super('Meow');
    }

    makeSound(): void {
      console.log('Purr');
    }
  }

  let cat = new Cat();
  cat.makeSound(); // Output: Purr
}
