# Chapter 6 : Advanced Types

- [Chapter 6 : Advanced Types](#chapter-6--advanced-types)
  - [Intersection Types](#intersection-types)
  - [Intersection Types vs Implementing Interfaces](#intersection-types-vs-implementing-interfaces)
  - [Type Guards](#type-guards)
  - [Discriminated Unions](#discriminated-unions)
  - [Type Casting](#type-casting)
  - [Index Properties](#index-properties)
  - [Function Overload](#function-overload)
  - [Optional Chaining](#optional-chaining)
  - [Nullish Coalescing](#nullish-coalescing)
  - [Boxed Types](#boxed-types)
  - [Keyof Type Operator](#keyof-type-operator)

## Intersection Types

Intersection types in TypeScript allow you to combine multiple types into a single type. They provide a way to create a new type that has all the properties and methods of the intersected types. Intersection types are denoted using the `&` operator.

**Syntax**

The syntax for creating an intersection type in TypeScript is as follows:

```TypeScript
type IntersectionType = Type1 & Type2 & Type3;
```

Here, `IntersectionType` is the name of the new type, and `Type1`, `Type2`, and `Type3` are the types being intersected.

**Example**

Let's consider an example to understand how intersection types work in TypeScript:

```TypeScript
interface Printable {
    print(): void;
}

interface Loggable {
    log(): void;
}

type Logger = Printable & Loggable;

class ConsoleLogger implements Logger {
    print() {
        console.log("Printing...");
    }

    log() {
        console.log("Logging...");
    }
}

let logger: Logger = new ConsoleLogger();
logger.print(); // Output: Printing...
logger.log(); // Output: Logging...
```

In this example, we have two interfaces: `Printable` and `Loggable`. Each interface defines a single method. We then create an intersection type called `Logger` by combining the `Printable` and `Loggable` interfaces using the & operator.

We implement the `Logger` interface in the `ConsoleLogger` class, which provides the implementation for both the `print` and `log` methods. We create an object of type `Logger` using the `ConsoleLogger` class and can call both the `print` and `log` methods on the `logger` object.

Intersection types allow us to create new types that combine the properties and methods of multiple existing types. They are useful when we want to create a type that has all the features of the intersected types.

**Use Cases**

Use cases for intersection types include:

1. **Combining Interfaces**: Intersection types allow you to combine multiple interfaces into a single interface. This is useful when you want to create a new interface that has all the properties and methods of the intersected interfaces.

2. **Creating Union-like Types**: Intersection types can be used to create types that behave like unions but with stricter type checking. By intersecting multiple types, you can create a new type that has the common properties and methods of the intersected types.

3. **Implementing Multiple Interfaces**: Intersection types are helpful when a class needs to implement multiple interfaces. By creating an intersection type of the required interfaces, you can ensure that the class provides the necessary properties and methods.

4. **Extending Existing Types**: Intersection types can be used to extend existing types by combining them with additional properties or methods. This allows you to create more specialized types based on existing ones.

In summary, intersection types in TypeScript allow you to combine multiple types into a single type. They are useful for combining interfaces, creating union-like types, implementing multiple interfaces, and extending existing types. Intersection types provide a way to create new types that have all the properties and methods of the intersected types.

## Intersection Types vs Implementing Interfaces

The difference between using intersection types and implementing multiple interfaces in TypeScript lies in their behavior and purpose.

**Intersection Types**:

- Intersection types allow you to combine multiple types into a single type using the & operator.
- When you create an intersection type, the resulting type will have all the properties and methods from the intersected types.
- Intersection types are useful for creating new types that have the combined features of the intersected types.
- They are primarily used to merge properties and methods from different types into a single type.
- Intersection types do not involve the concept of inheritance or implementation. They simply combine the features of the intersected types.

**Implementing Multiple Interfaces**:

- Implementing multiple interfaces involves creating a class or object that adheres to the contracts defined by multiple interfaces.
- Interfaces define a set of properties and methods that a class or object must implement.
- When a class implements multiple interfaces, it is required to provide the implementation for all the properties and methods defined in each interface.
Implementing multiple interfaces allows for achieving multiple inheritance-like behavior in TypeScript.
- It ensures that a class or object adheres to the contracts defined by multiple interfaces, providing a way to enforce consistent behavior across different objects.

In summary, intersection types are used to combine multiple types into a single type, merging their properties and methods. They are useful for creating new types with combined features. On the other hand, implementing multiple interfaces involves creating a class or object that adheres to the contracts defined by multiple interfaces, ensuring consistent behavior across different objects.

## Type Guards 

Type guards in TypeScript are techniques used to narrow down the type of a variable within a conditional block. They allow you to provide more specific type information to the TypeScript compiler, improving type safety and enabling better code flow.

> [!TIP]
> Type guards are also known as narrowing. You can learn more about Narrowing in [Typescript Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html) documentation.

Type guards are regular functions or operators that return a boolean value or a specific type. They are used to check the type of a variable and provide TypeScript with additional information about its type. The most commonly used type guards in TypeScript are:

1. **`typeof` Type Guard**: The typeof operator is a type guard that checks the type of a variable at runtime. It allows you to narrow down the type of a variable based on its primitive type, such as `string`, `number`, `boolean`, `object`, `function`, `undefined`, etc. Example: 
   
    ```TypeScript
    function printLength(value: string | number) {
        if (typeof value === "string") {
            console.log(value.length); // Output: length of the string
        } else {
            console.log("Not a string");
        }
    }
    ```
2. **`instanceof` Type Guard**: The instanceof operator is a type guard that checks if an object is an instance of a specific class or constructor function. It allows you to narrow down the type of an object based on its class or constructor. Example:
    
    ```TypeScript
    class Animal {
        name: string;
        constructor(name: string) {
            this.name = name;
        }
    }

    class Dog extends Animal {
        bark() {
            console.log("Woof!");
        }
    }

    function makeSound(animal: Animal) {
        if (animal instanceof Dog) {
            animal.bark(); // Output: Woof!
        } else {
            console.log("Unknown animal");
        }
    }
    ```
3. **`in` Type Guard**: The in operator is a type guard that checks if a property exists in an object. It allows you to narrow down the type of an object based on the presence of a specific property. Example:

    ```TypeScript
    interface Car {
        brand: string;
        model?: string;
    }

    function printModel(car: Car) {
        if ("model" in car) {
            console.log(car.model); // Output: model of the car
        } else {
            console.log("No model specified");
        }
    }
    ```
4. **User-Defined Type Guards**: User-defined type guards are custom functions that you define to narrow down the type of a variable based on your own conditions. These functions return a boolean value indicating whether the variable is of a specific type. Example:

    ```TypeScript
    interface Circle {
        radius: number;
    }

    interface Square {
        sideLength: number;
    }

    function isCircle(shape: Circle | Square): shape is Circle {
        return "radius" in shape;
    }

    function calculateArea(shape: Circle | Square) {
        if (isCircle(shape)) {
            console.log(Math.PI * shape.radius * shape.radius); // Output: area of the circle
        } else {
            console.log(shape.sideLength * shape.sideLength); // Output: area of the square
        }
    }
    ```

    **Explanation**: 
    - The `isCircle` function takes a parameter shape of type `Circle` | `Square`, which means it can accept objects that are either of type `Circle` or `Square`.
    - The return type of the `isCircle` function is `shape is Circle`. This syntax indicates that the function is a type guard and narrows down the type of `shape` to `Circle`.
    - Inside the function, the `in` operator is used to check if the shape object has a property called `radius`. If the `radius` property exists, the function returns `true`, indicating that the object is of type `Circle`. Otherwise, it returns `false`.
    - The `is` keyword in the `isCircle` example is used as a type predicate in TypeScript. It is a type guard that narrows down the type of a variable based on a specific condition.
    - In the `isCircle` function, the `is` keyword is used to check if the shape object is an instance of the `Circle` class.
    - By using the `shape is Circle` syntax, we inform the TypeScript compiler that within the `if` block where the `isCircle` function is called, the `shape` variable should be treated as type `Circle`.

These are some of the most commonly used type guards in TypeScript. They allow you to narrow down the type of variables within conditional blocks, enabling more precise type checking and better code flow.

> [!NOTE]
> The examples provided are for illustrative purposes and may not cover all possible use cases or variations of type guards.

## Discriminated Unions

Discriminated unions, also known as tagged union types or algebraic data types, are a feature in TypeScript that allow you to create a type that can represent several different possibilities or variants. They provide a way to define a type that can hold values of different types, with a tag or discriminator indicating the specific variant.

The fundamental idea behind discriminated unions is to add a field, often referred to as a discriminator or tag, to each of the combined types. This discriminator unambiguously identifies to which union a particular object belongs. By attaching discriminators to each variant, TypeScript's type system can help ensure that all possible cases are handled gracefully.

> [!WARNING]
> We can't use the `instanceof` operators in Union Types of interfaces. That's why we need the Discriminated Unions for narrowing in this scenario.

Here's an example to illustrate the concept of discriminated unions:

```TypeScript
interface Circle {
    kind: "circle";
    radius: number;
}

interface Rectangle {
    kind: "rectangle";
    width: number;
    height: number;
}

type Shape = Circle | Rectangle;
```

In this example, we have defined two interfaces, `Circle` and `Rectangle`, representing different shapes. The kind property serves as the discriminator, with a specific string literal value for each variant. The Shape type is a union of `Circle` and `Rectangle`.

By using the discriminators, TypeScript can narrow down the type within conditional blocks or switch statements based on the discriminator value. This enables type-specific operations and access to properties or methods that are only available on certain types.

> [!NOTE]
> The kind is not a simple property of the interface, instead of a primitive type, we use a literal type string `"rectangle"` or `"circle"` to define the union type. 

```TypeScript
function calculateArea(shape: Shape) {
    switch (shape.kind) {
        case "circle":
            console.log("Area of circle:", Math.PI * shape.radius * shape.radius);
            break;
        case "rectangle":
            console.log("Area of rectangle:", shape.width * shape.height);
            break;
        default:
            console.log("Unknown shape");
    }
}
```

In the `calculateArea` function, the type of `shape` is narrowed down based on the discriminator value. TypeScript can infer the specific type within each case of the switch statement, allowing for type-safe operations and access to the corresponding properties.

Discriminated unions are particularly useful when working with scenarios that involve multiple variants or options. They provide a way to model complex data structures and ensure that all possible cases are handled correctly.

## Type Casting

Type casting, also known as type conversion, is the process of changing the data type of a value from one type to another. It allows you to treat a value as if it belongs to a different data type, enabling you to perform operations or assignments that would otherwise be invalid.

Type casting can be categorized into two types: implicit (automatic) type casting and explicit (manual) type casting.

**Implicit Type Casting** 

Implicit type casting, also known as widening or automatic type casting, occurs when the compiler automatically converts a value from a smaller data type to a larger data type. This conversion is done automatically without the need for any explicit syntax.

For example, converting an integer to a float or a float to a double is considered implicit type casting. The compiler performs the conversion automatically, ensuring that no data is lost during the process.

```TypeScript
int num = 10;
float floatValue = num; // Implicit type casting from int to float
```

**Explicit Type Casting**

Explicit type casting, also known as narrowing or manual type casting, occurs when you manually convert a value from one data type to another using explicit syntax. This type of casting is necessary when you want to convert a value from a larger data type to a smaller data type, which may result in a loss of precision or truncation.

In languages like Java and C++, explicit type casting is done using parentheses and the target data type.

```TypeScript
double doubleValue = 3.14;
int intValue = (int) doubleValue; // Explicit type casting from double to int
```
In the above example, the `doubleValue` is explicitly cast to an `int` by using `(int)` before the variable name. This conversion truncates the decimal part of the `doubleValue` and assigns the integer part to `intValue`.

**Type Casting with Objects**

Type casting an object involves asserting that an object is of a specific type. TypeScript provides two syntax options for type casting objects:

- Using the `as` keyword:
    ```TypeScript
    let obj: any = { name: "John", age: 25 };
    let person = obj as Person;
    ```
    In this example, `obj` is cast to the `Person` type using the `as` keyword.
- Using angle brackets `<>`:
    ```TypeScript
    let obj: any = { name: "John", age: 25 };
    let person = <Person>obj;
    ```
    In this example, `obj` is cast to the `Person` type using angle brackets.

**Type Casting with Classes**

Type casting with classes involves casting an instance of a class to a more specific subclass. TypeScript provides the as keyword for type casting with classes:

```TypeScript
class Animal {
  eat() {
    console.log("Animal is eating");
  }
}

class Cat extends Animal {
  meow() {
    console.log("Cat is meowing");
  }
}

let animal: Animal = new Cat();
let cat = animal as Cat;
```
In this example, `animal` is cast to the `Cat` type using the `as` keyword.

**Type Casting with Interfaces**

Type casting with interfaces involves asserting that an object conforms to a specific interface. TypeScript provides the as keyword for type casting with interfaces:

```TypeScript
interface Mew {
  meow(): void;
}

class Cat implements Mew {
  meow() {
    console.log("Cat is meowing");
  }
}

let cat: Mew = new Cat();
let catObj = cat as Cat;
```
In this example, cat is cast to the Cat type using the as keyword.

> [!IMPORTANT]
> It's important to note that type casting should be used with caution, and you should ensure that the casting is valid and appropriate for the specific scenario.

## Index Properties

In TypeScript, index properties allow you to define object types that can have properties with dynamic names. They provide a way to describe the types of possible values for properties whose names are not known ahead of time. Index properties are useful when you want to work with objects that have flexible or unknown property names.

The syntax for index properties in TypeScript is as follows:

```TypeScript
{
  [key: KeyType]: ValueType;
}
```

Here's an example to illustrate the usage of index properties:

```TypeScript
interface Dictionary {
  [key: string]: number;
}

const myDictionary: Dictionary = {
  apple: 5,
  banana: 3,
  orange: 8,
};

console.log(myDictionary.apple); // Accessing property using dot notation
console.log(myDictionary["banana"]); // Accessing property using bracket notation
```

In this example, the `Dictionary` interface represents an object with dynamic property names of type `string` and property values of type `number`. The `myDictionary` object is an instance of this interface, and it can have properties with any string key and a corresponding numeric value.

Index properties can also be used with classes to define dynamic properties:

```TypeScript
class DynamicProperties {
  [key: string]: string;

  constructor() {
    this["property1"] = "value1";
    this["property2"] = "value2";
  }
}

const obj = new DynamicProperties();
console.log(obj.property1); // Accessing dynamic property
```
In this example, the DynamicProperties class has an index property that allows the creation of dynamic properties with string keys and string values.

Use cases for index properties include scenarios where you want to work with objects that have varying or unknown property names, such as working with JSON data, parsing dynamic configurations, or handling user input with dynamic keys.

## Function Overload

In TypeScript, function overloading allows you to define multiple function signatures for a single function name. Each function signature specifies a different set of parameter types and return type. This enables the TypeScript compiler to provide type checking and inference when calling the function with different argument combinations.

The syntax for function overloading in TypeScript is as follows:

```TypeScript
function functionName(arg1: Type1): ReturnType1;
function functionName(arg1: Type1, arg2: Type2): ReturnType2;
// Additional function signatures...

function functionName(arg1: Type1, arg2?: Type2): ReturnType {
  // Function implementation
}
```

Here's an example to illustrate the usage of function overloading:

```TypeScript
function greet(name: string): string;
function greet(age: number): string;
function greet(value: string | number): string {
  if (typeof value === "string") {
    return `Hello, ${value}!`;
  } else {
    return `You are ${value} years old.`;
  }
}
console.log(greet("John")); // Output: Hello, John!
console.log(greet(25)); // Output: You are 25 years old.
```

In this example, the `greet` function is overloaded with two different signatures. The first signature accepts a `string` argument and returns a `string`, while the second signature accepts a `number` argument and also returns a `string`. The function implementation handles both cases based on the type of the argument.

Function overloading can be useful in scenarios where a function can accept different types of arguments or perform different operations based on the provided arguments. It helps improve type safety and provides better code readability.

We can also add more variations of the function overload with different return types. 

> [!NOTE]
> The implementation signature of the function should be compatible with all the overload signatures. The TypeScript compiler will use the function implementation when resolving function calls based on the provided arguments.

## Optional Chaining

Optional chaining is a feature introduced in TypeScript 3.7 that allows you to safely access properties and methods of an object without worrying about potential null or undefined values. It provides a concise and clean syntax for handling nested property access and method calls.

The syntax for optional chaining in TypeScript is as follows:

```TypeScript
object?.property
object?.method()
```

Here are a few examples to illustrate the usage of optional chaining:

**Accessing Nested Properties**

```TypeScript
const user = {
  name: "John",
  address: {
    city: "New York",
    street: {
      name: "Main Street",
      number: 123,
    },
  },
};

const cityName = user?.address?.city; // Accessing nested property
const streetNumber = user?.address?.street?.number; // Accessing deeply nested property

console.log(cityName); // Output: "New York"
console.log(streetNumber); // Output: 123
```

In this example, optional chaining (`?.`) is used to safely access nested properties of the user object. If any intermediate property is null or undefined, the expression will short-circuit and return undefined instead of throwing an error.

**Calling Methods**

```TypeScript
const calculator = {
  add(a: number, b: number) {
    return a + b;
  },
};

const result = calculator?.add(5, 3); // Calling a method using optional chaining

console.log(result); // Output: 8
```

In this example, the `add` method of the calculator object is called using optional chaining. If the calculator object is `null` or `undefined`, the method call will be skipped, and the result will be `undefined`.

Optional chaining can be particularly useful when working with complex data structures, APIs, or when dealing with optional properties that may or may not exist. It helps to write more robust and concise code by avoiding unnecessary null checks and reducing the risk of runtime errors.

> [!NOTE]
> Optional chaining is also available in JavaScript, starting from ECMAScript 2020.

## Nullish Coalescing

Nullish coalescing is a feature introduced in TypeScript 3.7 and ECMAScript 2020 that provides a concise way to handle default values for null or undefined values. It allows you to specify a fallback value when accessing a property or variable that may be null or undefined.

The syntax for nullish coalescing in TypeScript is as follows:

```TypeScript
const result = valueToCheck ?? defaultValue;
```

Here are a few examples to illustrate the usage of nullish coalescing:

**Using Default Values**

```TypeScript
const name = null;
const defaultName = "John";

const displayName = name ?? defaultName;

console.log(displayName); // Output: "John"
```

In this example, the name variable is `null`, so the nullish coalescing operator (`??`) returns the `defaultName` value as the fallback.

**Handling Undefined Properties**

```TypeScript
const user = {
  name: "John",
  age: undefined,
};

const userName = user.name ?? "Unknown";
const userAge = user.age ?? 0;

console.log(userName); // Output: "John"
console.log(userAge); // Output: 0
```

In this example, the `user` object has an `undefined` age property. The nullish coalescing operator is used to provide default values ("Unknown" and 0) when accessing the potentially undefined property.

**Combining with Optional Chaining**

```TypeScript
const user = {
  name: "John",
  address: {
    city: "New York",
  },
};

const cityName = user.address?.city ?? "Unknown";

console.log(cityName); // Output: "New York"
```

In this example, the nullish coalescing operator is combined with optional chaining (`?.`) to safely access the `city` property of the `address` object. If any intermediate property is `null` or `undefined`, the operator returns the fallback value "Unknown".

Nullish coalescing is particularly useful when you want to provide default values for variables or properties that may be null or undefined. It helps to simplify code and handle potential null or undefined values more effectively.

> [!IMPORTANT]
> The nullish coalescing operator (`??`) only checks for `null` or `undefined` values, unlike the logical OR operator (`||`), which also considers falsy values such as an empty string or the number `0`.


## Boxed Types

Boxed types refer to objects that wrap primitive values (such as `numbers`, `strings`, `booleans`) to provide additional functionality. These boxed types include `Number`, `String`, `Boolean`, and `Object`. However, it is generally recommended to **avoid using boxed types** for several reasons:

- **Performance Overhead**: Boxed types introduce performance overhead compared to their corresponding primitive types. Operations on boxed types require additional memory allocation and method calls, which can impact performance, especially in performance-critical scenarios.

- **Type Coercion Complexity**: Boxed types can lead to complex type coercion behavior. JavaScript performs implicit type coercion, which can automatically convert between primitive types and their corresponding boxed types. This coercion behavior can sometimes be unpredictable and lead to unexpected results.

- **Identity vs. Value Comparison**: Boxed types have different identities compared to their corresponding primitive types. This can lead to unexpected behavior when comparing values using the `==` or `===` operators. For example, comparing a boxed Number object with a primitive number using `==` will check for object identity rather than value equality.

- **Limited Usefulness**: In most cases, using the primitive types directly is sufficient and more efficient. The additional functionality provided by boxed types is rarely needed in everyday JavaScript programming. For example, the String object provides methods for string manipulation, but most string operations can be performed directly on primitive strings.

It is generally recommended to use primitive types (`number`, `string`, `boolean`, etc.) instead of their corresponding boxed types (`Number`, `String`, `Boolean`, etc.) in JavaScript, unless there is a specific need for the additional functionality provided by the boxed types.

## Keyof Type Operator

The keyof operator takes an object type and produces a string or numeric literal union of its keys. The following type P is the same type as type P = "x" | "y":

```TypeScript
type Point = { x: number; y: number };
type P = keyof Point; // type P = keyof Point
```

If the type has a string or number index signature, keyof will return those types instead:

```TypeScript
type Arrayish = { [n: number]: unknown };
type A = keyof Arrayish; // type A = number
 
type Mapish = { [k: string]: boolean };
type M = keyof Mapish; // type M = string | number
```

> [!NOTE]
> Note that in this example, `M` is `string | number` — this is because JavaScript object keys are always coerced to a string, so `obj[0]` is always the same as `obj["0"]`.
---

[[<< Previous]](../Chapter-05/README.md) [[^Top]](#chapter-6--advanced-types) [[Next >>]](../Chapter-07/README.md)