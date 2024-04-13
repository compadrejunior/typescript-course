namespace Inheritance {
  class Person {
    constructor(private firstName: string, private lastName: string) {
      this.firstName = firstName;
      this.lastName = lastName;
    }

    getFullName(): string {
      return `${this.firstName} ${this.lastName}`;
    }

    describe(): string {
      return `This is ${this.firstName} ${this.lastName}.`;
    }
  }

  class Student extends Person {
    constructor(firstName: string, lastName: string, private grade: string) {
      super(firstName, lastName); // Calling the parent class constructor
      this.grade = grade;
    }

    getGrade(): string {
      return this.grade;
    }
  }

  let student = new Student('John', 'Doe', 'A');
  console.log(student.getFullName()); // Output: John Doe
  console.log(student.describe()); // Output: This is John Doe.
  console.log(student.getGrade()); // Output: A
}
