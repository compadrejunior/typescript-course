# Chapter 5 : Classes & Interfaces

- [Chapter 5 : Classes \& Interfaces](#chapter-5--classes--interfaces)
  - [What are classes?](#what-are-classes)
  - [`private` and `public` Access Modifiers](#private-and-public-access-modifiers)
  - [`readonly` Properties](#readonly-properties)
  - [Inheritance in TypeScript](#inheritance-in-typescript)
  - [Property Overriding](#property-overriding)
  - [Trying to override private properties](#trying-to-override-private-properties)
  - [The `protected` Keyword in Class Inheritance and Property Overriding](#the-protected-keyword-in-class-inheritance-and-property-overriding)
  - [Getters and Setters](#getters-and-setters)
  - [Static Methods and Properties in TypeScript](#static-methods-and-properties-in-typescript)
  - [Abstract Classes](#abstract-classes)
  - [Singletons and Private Constructors in TypeScript](#singletons-and-private-constructors-in-typescript)
  - [Interfaces in TypeScript](#interfaces-in-typescript)
  - [Readonly Interface Properties in TypeScript](#readonly-interface-properties-in-typescript)
  - [Extending Interfaces](#extending-interfaces)
  - [Interfaces as Function Types](#interfaces-as-function-types)
  - [Optional Parameters, Optional Properties, and Optional Methods](#optional-parameters-optional-properties-and-optional-methods)

## What are classes?

In TypeScript, classes are a fundamental part of object-oriented programming (OOP) and provide a blueprint for creating objects with properties and methods. They allow for the creation of reusable and organized code structures, promoting modularity and reusability. Let's delve into the key concepts of classes and objects in TypeScript.

**Classes in TypeScript**

In TypeScript, a class is a template for creating objects that encapsulate data (fields) and behavior (methods). It serves as a blueprint for defining the structure and behavior of objects. 

Let's explore the main roles of classes, fields, and methods in TypeScript based on the provided information.

**Classes**

- **Blueprint for Objects**: Classes in TypeScript act as templates for creating objects with predefined properties and methods.
- **Encapsulation**: They encapsulate related data and behavior, promoting modularity and reusability.
- **Inheritance and Polymorphism**: Classes support inheritance, allowing for the creation of subclasses that inherit properties and methods from a parent class. They also enable polymorphism, where objects of different classes can be treated as instances of a common superclass.

**Fields**

- **Data Members**: Fields in a class represent data pertaining to objects, such as properties or attributes.
- **Initialization**: Fields need to be initialized, either in the constructor or through definite assignment, to ensure that objects are in a valid state upon creation.
- **Visibility Modifiers**: Fields can be given visibility modifiers (`public`, `private`, `protected`, or `readonly`) to control their accessibility.

**Methods**

- **Actions and Behaviors**: Methods in a class represent actions that an object can take, such as performing calculations, modifying data, or interacting with other objects.
- **Type Annotations**: Methods, like fields, are typed using type annotations, similar to variables, to specify the types of their parameters and return values.
- **Visibility Modifiers**: Methods can also be given visibility modifiers to control their accessibility.

**Constructor**

The `constructor` method is a special method within a class that is responsible for creating and initializing objects of that class. It is called only once when an object is created, and it allows for the initialization of class properties and the execution of any setup logic. The constructor method is denoted by the keyword `constructor` and is used to define the initial state of the object.

**Syntax**

The syntax for defining a class in TypeScript is as follows:

```TypeScript
class ClassName {
  // Properties
  property1: type;
  property2: type;

  // Constructor
  constructor(param1: type, param2: type) {
    this.property1 = param1;
    this.property2 = param2;
  }

  // Methods
  methodName() {
    // Method body
  }
}
```

**Example**

```TypeScript
// Define a class
class Person {
  // Properties
  name: string;
  age: number;

  // Constructor
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  // Method
  greet() {
    return `Hello, my name is ${this.name} and I am ${this.age} years old.`;
  }
}

// Create an object of the class
const person1 = new Person("Alice", 25);

// Access object properties and call methods
console.log(person1.name); // Output: "Alice"
console.log(person1.greet()); // Output: "Hello, my name is Alice and I am 25 years old."

```
In this example, the Person class defines the structure of a person with name and age properties, as well as a greet method. An object person1 is created based on this class, and its properties and methods are accessed.

**The `this` keyword**

The `this` keyword in a class constructor in TypeScript refers to the current instance of the class. It allows you to access and modify the properties and methods of the object being created. The main roles of the `this` keyword in a class constructor are as follows:

- **Referencing Instance Properties**: Inside the constructor, you can use this to refer to the instance properties of the class. It allows you to assign values to the properties based on the constructor arguments or perform any necessary initialization.
- **Accessing Methods**: The this keyword also enables you to access the methods of the class from within the constructor. You can call other methods or perform actions based on the state of the object being created.
- **Setting Up Object State**: By using this, you can set up the initial state of the object being created. It allows you to assign values to properties, establish relationships between objects, or perform any other necessary setup logic.

> [!WARNING]
> The this keyword in classes and objects can be powerful, but it also has some potential pitfalls that developers should be aware of. 

Here are a few common pitfalls:

1. **Shadowing**: One common pitfall is when a local variable or parameter has the same name as an instance variable. In such cases, using this is necessary to differentiate between the two. Failure to use this can lead to unintended consequences and incorrect behavior.
2. **Confusion and Bugs**: Misunderstanding or misusing this can lead to confusion and bugs in the code. It's important to have a clear understanding of when and how to use this to avoid unexpected behavior.
3. **Method Chaining**: When using method chaining, care should be taken when using this to refer to the current object. Improper use of this in method chaining can lead to unexpected results or errors.
4. **Constructor Invocation**: In some cases, the this keyword is used to invoke another constructor within the same class. However, using this to call another constructor should be done with caution, as it can affect the order of execution and lead to unexpected behavior.
5. **Static Context**: The this keyword cannot be used in a static context, such as static methods or static initializers, as it refers to the current instance of the class. Attempting to use this in a static context will result in a compilation error.

To avoid these pitfalls, it's important to have a good understanding of the purpose and usage of the this keyword in the context of classes and objects. Proper usage of this can help clarify code, prevent naming conflicts, and improve the readability and maintainability of the codebase.

**The `new` keyword**

The `new` keyword in TypeScript is used to create an instance of a class, resulting in the creation of a new object based on the class blueprint. When the `new` keyword is used with a class constructor, it performs the following steps:

- **Object Creation**: The new keyword creates a new object instance based on the class.
- **Binding**: It binds the newly created object as the `this` context within the constructor function. This means that all references to `this` inside the constructor function now refer to the newly created object.
- **Constructor Execution**: The constructor function is executed, allowing for the initialization of the object's properties and the execution of any setup logic defined within the constructor.
- **Object Return**: The new keyword returns the newly created object as the result of the constructor call.

## `private` and `public` Access Modifiers

In TypeScript, access modifiers (private and public) are used to control the visibility and accessibility of class fields and methods. 

**Private Access Modifier**

- The `private` access modifier limits the visibility of class members (fields and methods) to within the same class.
- Private members cannot be accessed or modified from outside the class.
- It provides encapsulation by hiding implementation details and preventing direct access to sensitive data.
- Private members are only accessible within the class itself.
- The private access modifier is denoted by the `private` keyword.

Example: 

```TypeScript
class Person {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  private greet() {
    console.log(`Hello, my name is ${this.name}.`);
  }
}

const person1 = new Person("Alice");
console.log(person1.name); // Error: Property 'name' is private and only accessible within class 'Person'
person1.greet(); // Error: Property 'greet' is private and only accessible within class 'Person'
```

**Public Access Modifier**

- The `public` access modifier allows class members to be accessed and modified from anywhere, both within and outside the class.
- Public members are accessible by default if no access modifier is specified.
- It provides full visibility and allows unrestricted access to class members.
- The public access modifier is denoted by the `public` keyword.

Example:

```TypeScript
class Person {
  public name: string;

  constructor(name: string) {
    this.name = name;
  }

  public greet() {
    console.log(`Hello, my name is ${this.name}.`);
  }
}

const person1 = new Person("Alice");
console.log(person1.name); // Output: "Alice"
person1.greet(); // Output: "Hello, my name is Alice."
```

> [!IMPORTANT]
> It's important to note that TypeScript access modifiers are enforced during compilation, not at runtime. They provide a way to control the visibility and accessibility of class members, promoting encapsulation and data integrity. 

By using access modifiers appropriately, you can define the desired level of visibility for your class fields and methods.

## `readonly` Properties

In TypeScript, the `readonly` keyword is used to create read-only properties in classes, interfaces, or type aliases. Once a property is marked as readonly, its value cannot be reassigned after it has been initialized. Here's the syntax and examples of using the readonly keyword:

1. Read-only Property in a Class:
    ```TypeScript
    class Person {
      readonly name: string;

      constructor(name: string) {
        this.name = name;
      }
    }

    const person1 = new Person("Alice");
    person1.name = "Bob"; // Error: Cannot assign to 'name' because it is a read-only property.
    ```

2. Read-only Property in an Interface:
    ```TypeScript
    interface IPerson {
      readonly name: string;
      age: number;
    }

    const person: IPerson = { name: "Alice", age: 25 };
    person.name = "Bob"; // Error: Cannot assign to 'name' because it is a read-only property.    
    ```

3. Read-only Property in a Type Alias:
    ```TypeScript
    type Point = {
      readonly x: number;
      readonly y: number;
    };

    const point: Point = { x: 10, y: 20 };
    point.x = 5; // Error: Cannot assign to 'x' because it is a read-only property.
    ```

The `readonly` keyword ensures that the property cannot be modified after initialization, providing immutability and preventing accidental changes. It is important to note that the readonly modifier only applies at compile-time and does not provide runtime protection against property modifications.

By using the `readonly` keyword, you can create properties that are meant to be read-only, promoting data integrity and preventing unintended modifications.

## Inheritance in TypeScript

In TypeScript, inheritance is a fundamental object-oriented programming concept that allows a class to inherit properties and methods from another class. This enables code reuse and the creation of more specialized classes based on existing ones. TypeScript supports single inheritance and multilevel inheritance, but does not support multiple or hybrid inheritance.

To implement inheritance in TypeScript, the extends keyword is used. The child class, also known as the derived class, extends the parent class, also known as the base class or super class. The child class inherits all the properties and methods of the parent class, except for private members and constructors.

**Syntax**

```TypeScript
class ChildClass extends ParentClass {
    // additional properties and methods
}
```
Here, ChildClass is the name of the child class, ParentClass is the name of the parent class, and `extends` is the keyword used to establish the inheritance relationship.

**Example**

Let's consider an example to understand how inheritance works in TypeScript. We'll create a parent class called Person and a child class called Student. The Student class will inherit the properties and behaviors of the Person class, but will also have additional properties and functionalities.

```TypeScript
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
```

## Property Overriding

In TypeScript, property overriding is a mechanism that allows a child class to provide its own implementation or override the properties of its parent class. This gives the child class the ability to modify the behavior or value of inherited properties.

To override a property in TypeScript, you need to define the property with the same name in the child class. By doing so, the child class will have its own version of the property, which will be used instead of the parent class's property when accessed or modified.

**Syntax**

The syntax to override a property in TypeScript is as follows:

```TypeScript
class ChildClass extends ParentClass {
    propertyName: propertyType;

    // additional methods and properties
}
```
Here, ChildClass is the name of the child class, ParentClass is the name of the parent class, propertyName is the name of the property to be overridden, and propertyType is the type of the property.

**Example**

Let's consider an example to understand how property overriding works in TypeScript. We'll create a parent class called Animal with a property called sound, and a child class called Cat that overrides the sound property.


```TypeScript
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
```

In this example, the Animal class has a property called sound that is set in its constructor. The Cat class extends the Animal class and overrides the sound property. The Cat class sets a different value for the sound property in its constructor.

When we create an instance of the Cat class and call the makeSound() method, it will print the value of the sound property defined in the Cat class, not the one defined in the Animal class. The output will be "Purr" instead of "Meow".

This demonstrates how property overriding allows child classes to provide their own implementation of inherited properties, modifying the behavior or value to suit their specific needs.

In summary, property overriding in TypeScript allows child classes to override the properties of their parent classes with their own implementation. This provides flexibility and customization in the behavior of inherited properties.

## Trying to override private properties

If we try to override a private property of a superclass in a subclass, it will not be possible. Private properties are not accessible or visible outside the class in which they are declared. Therefore, they cannot be accessed or overridden by subclasses.

When a property is marked as `private` in a superclass, it means that it is intended to be used only within that class and should not be modified or accessed by any other class, including subclasses. Attempting to override a private property in a subclass will result in a compile-time error.

Here's an example to illustrate this:

```TypeScript
class Animal {
    private sound: string;

    constructor(sound: string) {
        this.sound = sound;
    }

    makeSound(): void {
        console.log(this.sound);
    }
}

class Cat extends Animal {
    private sound: string; // Trying to override the private property

    constructor() {
        super("Meow");
        this.sound = "Purr";
    }

    makeSound(): void {
        console.log(this.sound);
    }
}

let cat = new Cat();
cat.makeSound(); // Output: Purr
```

In this example, the Animal class has a private property called sound. The Cat class attempts to override this property by declaring its own private sound property. However, this will result in a compile-time error, as private properties cannot be overridden.

It's important to note that private properties are not meant to be accessed or modified by subclasses. They are designed to encapsulate implementation details and provide encapsulation within the class itself.

In summary, overriding a private property of a superclass in a subclass is not possible in TypeScript. Private properties are not accessible outside the class in which they are declared, including subclasses

## The `protected` Keyword in Class Inheritance and Property Overriding

In TypeScript, the `protected` keyword is an access modifier that can be applied to class members (properties and methods) in order to restrict their visibility. When a member is marked as "protected", it can be accessed within the class itself and by its subclasses, but not from outside the class hierarchy.

The `protected` keyword plays a crucial role in class inheritance and property overriding. It allows child classes to access and override the protected members of their parent classes, providing a way to modify or extend the behavior of inherited properties.

**Syntax**

The syntax to declare a protected member in TypeScript is as follows:

```TypeScript
class ClassName {
    protected propertyName: propertyType;

    // other members and methods
}
```

Here, ClassName is the name of the class, propertyName is the name of the protected property, and propertyType is the type of the property.

**Example**

Let's consider an example to understand how the "protected" keyword works in class inheritance and property overriding:

```TypeScript
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
        super("Meow");
    }

    makeSound(): void {
        console.log("Purr");
    }
}

let cat = new Cat();
cat.makeSound(); // Output: Purr
```
In this example, the Animal class has a protected property called sound. The Cat class extends the Animal class and overrides the makeSound() method. The Cat class does not have direct access to the sound property, but it can access and modify it through the inherited makeSound() method.

When we create an instance of the Cat class and call the makeSound() method, it will print "Purr" instead of the value of the sound property defined in the Animal class. This demonstrates how the child class can override the behavior of the protected property.

By using the `protected` keyword, we ensure that the sound property is not accessible outside the class hierarchy, but it can be accessed and modified by the child class.

In summary, the "protected" keyword in TypeScript allows class members to be accessed within the class and its subclasses, enabling property overriding and customization. It provides a way to control the visibility and accessibility of properties in class inheritance.

## Getters and Setters

In TypeScript, getters and setters are methods that allow controlled access to class properties. Getters are used to retrieve the value of a property, while setters are used to modify the value of a property with certain validations or actions. They provide a way to encapsulate and protect class properties while allowing controlled access.

**Syntax**

```TypeScript
class ClassName {
    private _propertyName: propertyType;

    get propertyName(): propertyType {
        // getter logic
        return this._propertyName;
    }

    set propertyName(value: propertyType) {
        // setter logic
        this._propertyName = value;
    }
}

```

Here, ClassName is the name of the class, _propertyName is the private backing property for the getter and setter, propertyName is the name of the property, propertyType is the type of the property, and value is the value to be set in the setter.

**Example**

Let's consider an example to understand how getters and setters work in TypeScript:

```TypeScript
class Car {
    private _price: number = 0;

    get price(): number {
        return this._price;
    }

    set price(value: number) {
        if (value < 0) {
            throw new Error("Price cannot be negative.");
        }
        this._price = value;
    }
}

let car = new Car();
car.price = 50000; // Using the setter
console.log(car.price); // Using the getter, Output: 50000

car.price = -1000; // Using the setter with an invalid value, throws an error
```

In this example, the Car class has a private property called _price, which is accessed through the getter and setter methods. The getter method retrieves the value of the _price property, while the setter method sets the value of the _price property after performing a validation check.

When we create an instance of the Car class, we can use the setter to set the price of the car, and then use the getter to retrieve the price. In this case, the output will be 50000.

If we try to set a negative value for the price using the setter, it will throw an error due to the validation check in the setter.

Getters and setters provide a way to control access to class properties, allowing for validation, additional logic, or encapsulation of implementation details.

In summary, getters and setters in TypeScript are methods that provide controlled access to class properties. They allow retrieval and modification of property values with additional logic or validations. By using getters and setters, you can encapsulate and protect class properties while providing controlled access to them.

## Static Methods and Properties in TypeScript

In TypeScript, `static` methods and properties belong to the class itself rather than to instances of the class. They are accessed using the class name, without the need to create an object of the class. Static methods are often used for utility functions, while static properties are useful for storing data that doesn't need to be replicated across instances.

**Syntax**

The syntax for defining a static method and a static property in TypeScript is as follows:

```TypeScript
class ClassName {
    static propertyName: propertyType;

    static methodName(): returnType {
        // method logic
    }
}

```

Here, ClassName is the name of the class, propertyName is the name of the static property, propertyType is the type of the property, methodName is the name of the static method, and returnType is the return type of the method.

**Example**

Let's consider an example to understand how static methods and properties work in TypeScript:

```TypeScript
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
```

In this example, the Circle class has a static property called pi, which stores the value of pi. It also has an instance property called radius, which represents the radius of a circle.

The Circle class also has a static method called calculateArea, which calculates the area of a circle based on the given radius. The static method uses the static property pi to perform the calculation.

We can access the static property and call the static method directly using the class name, without creating an instance of the class. Additionally, we can access the instance property radius by creating an object of the Circle class.

The output of the above example will be as shown in the comments.

> [!IMPORTANT]
> Static properties cannot be accessed with `this` keyword.

In summary, static methods and properties in TypeScript belong to the class itself rather than instances of the class. They are accessed using the class name and provide a way to define utility functions and store data that is shared among all instances of the class.

## Abstract Classes

In TypeScript, abstract classes are base classes that cannot be instantiated directly. They are designed to be inherited by other classes, serving as a blueprint for derived classes. Abstract classes can contain both abstract and non-abstract methods, allowing for a combination of implementation details and method signatures.

**Syntax**

The syntax for defining an abstract class in TypeScript is as follows:

```TypeScript
abstract class ClassName {
    abstract methodName(): returnType;

    // other non-abstract methods and properties
}
```

Here, ClassName is the name of the abstract class, methodName is the name of the abstract method, and returnType is the return type of the method.

**Example**

Let's consider an example to understand how abstract classes work in TypeScript:

```TypeScript
abstract class Animal {
    abstract makeSound(): void;

    move(): void {
        console.log("Moving...");
    }
}

class Cat extends Animal {
    makeSound(): void {
        console.log("Meow");
    }
}

let cat = new Cat();
cat.makeSound(); // Output: Meow
cat.move(); // Output: Moving...
```

In this example, the Animal class is an abstract class that defines an abstract method called makeSound(). The Cat class extends the Animal class and provides an implementation for the makeSound() method.

We cannot create an instance of the Animal class directly because it is abstract. However, we can create an instance of the Cat class, which inherits from the Animal class. We can call the makeSound() method on the Cat instance, which will output "Meow". We can also call the move() method, which is inherited from the Animal class and outputs "Moving...".

Abstract classes provide a way to define common behavior and method signatures for derived classes. They can contain both abstract and non-abstract methods, allowing for a combination of implementation details and method contracts.

In summary, abstract classes in TypeScript are base classes that cannot be instantiated directly. They are designed to be inherited by other classes and provide a blueprint for derived classes. Abstract classes can contain abstract and non-abstract methods, allowing for a combination of implementation details and method signatures.

## Singletons and Private Constructors in TypeScript

In TypeScript, a singleton is a design pattern that restricts the instantiation of a class to a single object. It ensures that only one instance of the class exists throughout the application and provides a global point of access to that instance.

To implement a singleton in TypeScript, we can use a combination of a private constructor and a static method to control the creation and access to the single instance of the class.

Here's an example of implementing a singleton in TypeScript:

```TypeScript
class Singleton {
    private static instance: Singleton;

    private constructor() {
        // Private constructor to prevent direct instantiation
    }

    public static getInstance(): Singleton {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
        }
        return Singleton.instance;
    }

    public someMethod(): void {
        console.log("Singleton method called");
    }
}

let singleton1 = Singleton.getInstance();
let singleton2 = Singleton.getInstance();

console.log(singleton1 === singleton2); // Output: true
singleton1.someMethod(); // Output: Singleton method called
```
In this example, the Singleton class has a private constructor, preventing direct instantiation of the class. The class also has a static method called getInstance(), which is responsible for creating and returning the single instance of the class. The static method checks if an instance already exists and creates one if it doesn't.

By calling the getInstance() method, we can obtain the single instance of the Singleton class. Subsequent calls to getInstance() will return the same instance, ensuring that only one instance exists throughout the application.

The output of the above example will be true, indicating that singleton1 and singleton2 refer to the same instance of the Singleton class. We can then call the someMethod() on either instance, and it will output "Singleton method called".

Private constructors in TypeScript are useful not only for implementing singletons but also for other scenarios where we want to control the instantiation of a class. By making the constructor private, we prevent accidental or unauthorized creation of instances outside the class.

**Use Cases**

Use cases for singletons in TypeScript include:

- **Application Configuration**: Singletons can be used to manage application configuration settings. By creating a singleton class that holds the configuration values, you can ensure that there is only one instance of the configuration throughout the application, providing a centralized and easily accessible point for accessing and modifying configuration settings.

- **Database Connections**: When working with databases, it is often desirable to have a single connection instance that can be shared across different parts of the application. By implementing a singleton pattern for the database connection class, you can ensure that only one connection is created and reused throughout the application, improving performance and resource management.

- **Logging**: Singletons can be used to manage logging functionality in an application. By creating a logger singleton, you can have a centralized logging mechanism that can be accessed from different parts of the application, allowing for consistent logging behavior and easy customization of logging settings.

- **Caching**: Singletons can be used to implement caching mechanisms. By creating a cache singleton, you can ensure that there is only one instance of the cache throughout the application, providing a centralized point for caching data and improving performance by avoiding redundant computations or data retrieval.

- **Event Bus**: Singletons can be used to implement an event bus or message broker. By creating a singleton event bus, you can have a centralized mechanism for publishing and subscribing to events or messages within the application, facilitating communication between different components or modules.

> [!IMPORTANT]
> It's important to note that while singletons can be useful in certain scenarios, they should be used judiciously and with caution. Overuse of singletons can lead to tight coupling, hidden dependencies, and difficulties in testing. It's recommended to consider the specific use case and evaluate whether a singleton is the most appropriate solution.

In summary, singletons in TypeScript are implemented using a private constructor and a static method to control the creation and access to a single instance of a class. Private constructors ensure that only the class itself can create instances, enforcing the singleton pattern.

## Interfaces in TypeScript

In TypeScript, interfaces define the structure or shape of an object. They provide a way to enforce a specific syntax on classes, specifying the types of data that an object must have. Interfaces act as contracts that describe the shape of an object and enable strong type checking for functions, variables, or classes that implement the interface.

**Syntax**

The syntax for defining an interface in TypeScript is as follows:

```TypeScript
interface InterfaceName {
    propertyName: propertyType;
    methodName(): returnType;
    // ...
}
```
Here, InterfaceName is the name of the interface, propertyName is the name of a property in the interface, propertyType is the type of the property, methodName is the name of a method in the interface, and returnType is the return type of the method.

**Example**

Let's consider an example to understand how interfaces work in TypeScript:

```TypeScript
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

let circle: Shape = new Circle("red", 5);
console.log(circle.color); // Output: red
console.log(circle.calculateArea()); // Output: 78.53981633974483
```

In this example, we define an interface called Shape that specifies the properties color (of type string) and the method calculateArea (returning a number). The Circle class implements the Shape interface, which means it must provide an implementation for the properties and methods defined in the interface.

We create an instance of the Circle class and assign it to a variable of type Shape. We can access the color property and call the calculateArea method on the circle variable, which outputs the color and the calculated area of the circle.

Interfaces are useful for enforcing contracts and ensuring that classes adhere to a specific structure. They provide a way to define the expected properties and methods that a class should have. By implementing an interface, a class must provide implementations for all the members defined in the interface.

Use cases for interfaces with classes include:

- **Enforcing structure**: Interfaces ensure that classes have specific properties and methods, providing a contract that must be followed.
- **Code reusability**: Interfaces can be reused across multiple classes, allowing for consistent structure and behavior.
- **Type checking**: Interfaces enable strong type checking, catching errors at compile-time if a class does not implement all the members defined in the interface.
- **Polymorphism**: Interfaces allow objects of different classes to be treated as instances of a common interface, enabling polymorphic behavior.

When using interfaces with objects in TypeScript, the interface defines the structure or shape of the object. It specifies the properties and their types that an object must have. By implementing an interface, an object is required to adhere to the structure defined by the interface.

The main difference between using interfaces with objects and using interfaces with classes is the purpose and usage.

**Interfaces with Objects**:

- When using interfaces with objects, the goal is to define the shape of an object and enforce a contract for the properties it should have.
- Interfaces with objects are useful for describing the structure of data objects, ensuring consistency and type-checking.
- They can be used to represent the shape of data passed between different parts of an application or between different modules.
- Interfaces with objects are also helpful when interacting with third-party JavaScript libraries, where you may need to fully describe the shape of the type.
- Interfaces with objects do not provide implementation or initialization for the properties and methods defined in the interface.
- Interfaces can be used to represent types in your application, similar to normal type declarations.

**Interfaces with Classes**:

- When using interfaces with classes, the goal is to enforce that a class meets a particular contract defined by the interface.
- Interfaces with classes are used to explicitly define that a class must implement specific properties and methods.
- They ensure that a class adheres to a contract and provides a consistent structure.
- Interfaces with classes allow for polymorphism, where objects of different classes can be treated as instances of a common interface.
- The class implementing the interface needs to strictly conform to the structure defined by the interface.
- Interfaces with classes can be used to define contracts within your code and with code outside of your project.

In summary, interfaces in TypeScript define the structure or shape of an object. They enforce a specific syntax on classes, specifying the types of data that an object must have. Interfaces provide contracts that describe the shape of an object and enable strong type checking. They are useful for enforcing structure, reusability, type checking, and enabling polymorphism in TypeScript classes.


## Readonly Interface Properties in TypeScript

In TypeScript, interfaces can have readonly properties. The readonly modifier is used to indicate that a property should not be modified after it is assigned a value. Readonly properties provide a way to enforce immutability for specific properties within an object.

**Syntax**

The syntax for defining a readonly property in an interface is as follows:

```TypeScript
interface InterfaceName {
    readonly propertyName: propertyType;
    // ...
}
```
Here, InterfaceName is the name of the interface, propertyName is the name of the readonly property, and propertyType is the type of the property.

**Example**

Let's consider an example to understand how readonly properties work in TypeScript interfaces:

```TypeScript
interface Person {
    readonly name: string;
    age: number;
}

let person: Person = { name: "John", age: 30 };
console.log(person.name); // Output: John

person.name = "Jane"; // Error: Cannot assign to 'name' because it is a read-only property
person.age = 35; // Okay

console.log(person.name); // Output: John (value remains unchanged)
console.log(person.age); // Output: 35 (value can be modified)
```

In this example, we define an interface called Person with a readonly property name of type string and a non-readonly property age of type number. We create an object person that conforms to the Person interface.

We can access the value of the readonly property name, but if we try to assign a new value to it (person.name = "Jane"), a compile-time error will occur, indicating that the property is read-only. However, we can assign a new value to the non-readonly property age without any issues.

Readonly properties in interfaces ensure that the assigned value cannot be modified after initialization, providing a way to enforce immutability for specific properties.

> [!IMPORTANT]
> Interfaces cannot use other access modifiers `private`, `public` or `protected`.

**Use Cases**

Use cases for readonly interface properties include:

- **Immutable Data**: Readonly properties can be used to enforce immutability for certain data within an object. This can be useful when you want to ensure that specific properties remain constant and cannot be accidentally modified.

- **API Contracts**: Readonly properties in interfaces can be used to define the shape of data that is passed between different parts of an application or between different modules. By marking certain properties as readonly, you can communicate that those properties should not be modified by the receiving code.

- **Data Integrity**: Readonly properties can help maintain data integrity by preventing accidental modifications. By making certain properties readonly, you can ensure that critical data remains unchanged and prevent unintended side effects.

- **Functional Programming**: Readonly properties align with the principles of functional programming, where immutability is emphasized. By using readonly properties, you can create objects that are more predictable and easier to reason about.

> [!IMPORTANT]
> It's important to note that readonly properties in interfaces only enforce immutability at compile-time. They do not provide runtime immutability guarantees. If you need runtime immutability, you may need to use other techniques or libraries.

In summary, readonly properties in TypeScript interfaces allow you to enforce immutability for specific properties within an object. They can be useful for ensuring data integrity, defining API contracts, maintaining immutability in functional programming, and enforcing immutability for specific data.

## Extending Interfaces

Interface inheritance in TypeScript allows one interface to inherit the properties and methods of another interface. This enables the derived interface to extend or specialize the behavior defined in the base interface. Interface inheritance promotes code reuse and provides a way to create more specific interfaces based on existing ones.

**Syntax**

The syntax for interface inheritance in TypeScript is as follows:

```TypeScript
interface BaseInterface {
    // properties and methods
}

interface DerivedInterface extends BaseInterface {
    // additional properties and methods
}
```

Here, DerivedInterface is the interface that extends BaseInterface, inheriting all the properties and methods defined in the base interface.

**Example**

Let's consider an example to understand how interface inheritance works in TypeScript:

```TypeScript
interface Shape {
    color: string;
    calculateArea(): number;
}

interface Circle extends Shape {
    radius: number;
}

let circle: Circle = { color: "red", radius: 5 };

console.log(circle.color); // Output: red
console.log(circle.radius); // Output: 5
console.log(circle.calculateArea()); // Error: Property 'calculateArea' does not exist on type 'Circle'
```

In this example, we have a base interface called Shape that defines the properties color and the method calculateArea(). We then define a derived interface called Circle that extends the Shape interface and adds the radius property.

We create an object circle that conforms to the Circle interface. We can access the properties color and radius on the circle object. However, since the calculateArea() method is defined in the base Shape interface and not in the Circle interface, we get a compile-time error when trying to call circle.calculateArea().

Interface inheritance allows us to create more specialized interfaces by extending existing ones, inheriting their properties and methods. This promotes code reuse and provides a way to define interfaces that build upon each other.

**Use Cases**

Use cases for interface inheritance include:

- **Specialization**: Interface inheritance allows for creating more specific interfaces that specialize the behavior defined in a base interface. This enables the creation of interfaces that are tailored to specific use cases or scenarios.

- **Modularity**: Interface inheritance promotes modularity by allowing interfaces to be broken down into smaller, reusable parts. Interfaces can be defined hierarchically, with more general interfaces serving as base interfaces and more specific interfaces extending them.

- **Code Reuse**: Interface inheritance enables code reuse by inheriting properties and methods from existing interfaces. This reduces duplication and promotes consistency across different interfaces.

- **Polymorphism**: Interface inheritance supports polymorphism, where objects of different types can be treated as instances of a common interface. This allows for writing code that can work with different objects that implement the same interface, providing flexibility and extensibility.

In summary, interface inheritance in TypeScript allows one interface to inherit the properties and methods of another interface. It promotes code reuse, specialization, modularity, and supports polymorphism. Interface inheritance provides a way to create more specific interfaces based on existing ones, enabling the building of complex and flexible type hierarchies.

## Interfaces as Function Types

In TypeScript, interfaces can also be used to describe function types. This means that interfaces can define the signature of a function, including the parameter types and return type. By using interfaces to describe function types, you can enforce type checking and ensure that functions adhere to a specific signature.

**Syntax**

The syntax for defining a function type using an interface in TypeScript is as follows:

```TypeScript
interface FunctionInterface {
    (parameter1: type1, parameter2: type2, ...): returnType;
}
```

Here, FunctionInterface is the name of the interface, and within the interface, you define the function signature by specifying the parameter names, their types, and the return type.

**Example**

Let's consider an example to understand how interfaces can be used to describe function types in TypeScript:

```TypeScript
interface MathOperation {
    (a: number, b: number): number;
}

let add: MathOperation = function(a: number, b: number): number {
    return a + b;
};

let multiply: MathOperation = function(a: number, b: number): number {
    return a * b;
};

console.log(add(5, 3)); // Output: 8
console.log(multiply(5, 3)); // Output: 15
```

In this example, we define an interface called MathOperation that describes a function type. The function type takes two parameters of type number and returns a value of type number. We then create two variables add and multiply of type MathOperation and assign them anonymous functions that match the function signature defined in the interface.

We can call the add and multiply functions, passing in the required arguments, and they will return the expected results.

Interfaces as function types allow us to define the signature of functions and enforce type checking. They provide a way to describe the shape of functions and ensure that functions adhere to a specific signature.


**Use Cases**

Use cases for interfaces as function types include:

- **Callback Functions**: Interfaces can be used to define the signature of callback functions. By using an interface to describe the expected callback function type, you can ensure that the callback function passed to a higher-order function or an asynchronous operation matches the required signature.

- **Event Handlers**: Interfaces can be used to define the signature of event handlers. By using an interface to describe the expected event handler function type, you can enforce that event handlers have the correct parameters and return type when handling events in your application.

- **Dependency Injection**: Interfaces can be used to define the signature of functions that act as dependencies in dependency injection scenarios. By using an interface to describe the required function type, you can ensure that the injected function adheres to the expected signature.

- **Function Composition**: Interfaces can be used to describe the signature of functions that are composed together. By using interfaces to define the function types, you can ensure that the composed functions have compatible signatures and can be combined correctly.

In summary, interfaces in TypeScript can be used to describe function types, including the parameter types and return type. They allow for enforcing type checking and ensuring that functions adhere to a specific signature. Interfaces as function types are useful for callback functions, event handlers, dependency injection, and function composition scenarios.

## Optional Parameters, Optional Properties, and Optional Methods

In TypeScript, you can make parameters, properties, and methods optional by using the `?` symbol. This allows you to define elements that are not required and can be omitted when using or implementing them.

**Optional Parameters**:

Optional parameters are parameters in a function or method that can be omitted when calling the function. To make a parameter optional, you add a `?` symbol after the parameter name in the function declaration. Optional parameters must come after the required parameters.

**Example**:

```TypeScript
function greet(name: string, age?: number) {
    if (age) {
        console.log(`Hello ${name}, you are ${age} years old.`);
    } else {
        console.log(`Hello ${name}.`);
    }
}

greet("John"); // Output: Hello John.
greet("Jane", 25); // Output: Hello Jane, you are 25 years old.
```

In this example, the `age` parameter is optional. When calling the `greet` function, you can omit the `age` argument, and it will default to `undefined`. If the `age` argument is provided, it will be displayed in the output.

**Optional Properties**:

Optional properties are properties in an object that may or may not be present. To define an optional property in an interface, you add a `?` symbol after the property name in the interface declaration.

**Example**:

```TypeScript
interface Person {
    name: string;
    age?: number;
}

let person1: Person = { name: "John" };
let person2: Person = { name: "Jane", age: 25 };
```

In this example, the `age` property is optional in the `Person` interface. When creating objects of type `Person`, you can choose to include or omit the `age` property.

**Optional Methods**:

Optional methods are methods in an interface or class that may or may not be implemented. To define an optional method in an interface, you do not provide an implementation for the method.

**Example**:

```TypeScript
interface Logger {
    log(message: string): void;
    error?(errorMessage: string): void;
}

class ConsoleLogger implements Logger {
    log(message: string) {
        console.log(message);
    }
}

let logger: Logger = new ConsoleLogger();
logger.log("This is a log message.");
```

In this example, the `error` method in the `Logger` interface is optional. The `ConsoleLogger` class implements the `log` method but does not implement the `error` method. When using the `logger` object, you can only call the `log` method, as the `error` method is optional.


**Use Cases**:

- Optional parameters are useful when you want to provide flexibility in function calls, allowing certain arguments to be omitted.
- Optional properties are helpful when dealing with objects that may have varying sets of properties, allowing for more flexible object structures.
- Optional methods are beneficial when you want to define a common interface but allow different implementations to choose whether or not to implement certain methods.

Optional parameters, properties, and methods provide flexibility and allow for more adaptable code structures in TypeScript. They are particularly useful when dealing with scenarios where certain elements may or may not be present or required.

---

[[<< Previous]](../Chapter-04/README.md) [[^Top]](#chapter-5--classes--interfaces) [[Next >>]](../Chapter-06/README.md)
