namespace Interfaces {
  interface Shape {
    color: string;
    calculateArea(): number;
  }

  class Circle implements Shape {
    color: string;
    radius: number;

    constructor(color: string, radius: number) {
      this.color = color;
      this.radius = radius;
    }

    calculateArea(): number {
      return Math.PI * this.radius * this.radius;
    }
  }

  let circle: Shape = new Circle('red', 5);
  console.log(circle.color); // Output: red
  console.log(circle.calculateArea()); // Output: 78.53981633974483
}
