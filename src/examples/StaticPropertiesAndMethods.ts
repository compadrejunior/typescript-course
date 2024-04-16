namespace StaticPropertiesAndMethods {
  class Circle {
    static pi: number = 3.14;
    radius: number;

    constructor(radius: number) {
      this.radius = radius;
    }

    static calculateArea(radius: number): number {
      return Circle.pi * radius * radius;
    }
  }

  let circle = new Circle(5);
  console.log(Circle.pi); // Accessing the static property, Output: 3.14
  console.log(Circle.calculateArea(5)); // Calling the static method, Output: 78.5
  console.log(circle.radius); // Accessing the instance property, Output: 5
}
