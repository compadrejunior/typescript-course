namespace GetAndSet {
  class Car {
    private _price: number = 0;

    get price(): number {
      return this._price;
    }

    set price(value: number) {
      if (value < 0) {
        throw new Error('Price cannot be negative.');
      }
      this._price = value;
    }
  }

  let car = new Car();
  car.price = 50000; // Using the setter
  console.log(car.price); // Using the getter, Output: 50000

  car.price = -1000; // Using the setter with an invalid value, throws an error
}
