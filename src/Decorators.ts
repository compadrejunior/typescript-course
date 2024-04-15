namespace Decorators {
  // Factory for Logger decorator
  function Logger(target: Function) {
    console.log('Logging...');
    console.log(target);
  }

  @Logger // this will apply the decorator to the class definition
  class Person {
    name = 'Max';

    constructor() {
      console.log('Creating person object...');
    }
  }

  const person = new Person();
  console.log(person);
}
