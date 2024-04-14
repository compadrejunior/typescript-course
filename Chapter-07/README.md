# Chapter 7: Generics

- [Chapter 7: Generics](#chapter-7-generics)
  - [What are Generics?](#what-are-generics)
  - [TypeScript Built-in Generics\*\*](#typescript-built-in-generics)
  - [Working with Constraints](#working-with-constraints)
  - [The `keyof` Constraint](#the-keyof-constraint)
  - [Generic Classes](#generic-classes)
  - [Generic Parameter Defaults](#generic-parameter-defaults)
  - [Mapped Types](#mapped-types)
  - [Mapping Modifiers](#mapping-modifiers)
  - [Key Remapping via as](#key-remapping-via-as)
  - [Template Literal Types](#template-literal-types)

## What are Generics?

Generics in TypeScript allow us to create reusable components that can work with different types of data. They provide a way to define placeholder types that are replaced with actual types when the code is executed. This flexibility makes our programs more scalable and adaptable in the long term.

**How do Generics work?**

When using generics, we define a type variable, often denoted as T, inside angle brackets (`<>`). This type variable can represent any type and is used as a placeholder for the actual type that will be passed in when using the generic component or function.

For example, consider a generic function called `printData` that takes an argument of type `T` and prints its value. The type `T` can be any type, such as `number`, `string`, or a custom type. By using generics, we can reuse the same function for different types of data without having to write separate functions for each type.

Here's an example of a generic function in TypeScript:

```TypeScript
function printData<T>(data: T): void {
  console.log(data);
}

printData<number>(42); // Output: 42
printData<string>("Hello"); // Output: Hello
```

In this example, the type variable `T` represents the type of the data parameter. We can explicitly specify the type argument when calling the function, or TypeScript can infer it based on the value passed in.

**Declaring Multiple Generic Types**

We can also define different generic types. Imagine we need to merge two different objects.

```TypeScript
// Without generics
 function merge(ojbA: object, objB: object) {
    return Object.assign(ojbA, objB);
  }
  const mergeObj = merge({ name: 'Max' }, { age: 30 });
  console.log(mergeObj.age); // error, Property 'age' does not exist on type 'object'
```

The problem in code above is that TypeScript doesn't know nothing what is the shape of returned object. When we try to access one of it's properties we will get an error.

If we want to merge two different objects (no matter what types of objects they are) we need to specify different keywords for the generic types. We usually use the `T` for the first type and the second can be any uppercase letter. Here we will call it `U`. 

> [!TIP]
> Naming conventions for generic types aren't restrictive, but we commonly see the use of `T` or `Type`. As a general guide, use a name that will be explicit on how it will be used. Examples: `function addParameter<Key, Value>(key: Key, value: Value)`. 

```TypeScript
  // With generics
  function merge<T extends object, U extends object>(objA: T, objB: U) {
    // returns the intersection of T & U
    return Object.assign(objA, objB); // Copy the values of all of the enumerable own properties from one or more source objects to a target object. Returns the target object.
  }
  // Merging two different objects
  const mergeObj = merge({ name: 'Max' }, { age: 30 });
  console.log(mergeObj); // { name: 'Max', age: 30 }
```

In the example we created a function `merge` and specified two generic types, `T` and `U`, that extends the object type. We then call the `assign` function from the `Object` wrapper class to copy into `objA` all properties of `objB`. With this syntax, TypeScript can infer that the return type of this function will be an intersection between `T` and `U`. Finally we create a constant called `mergeObj` and call our `merge` function passing two different objects. The result will print a single object with the combined properties of `objA` and `objB`.

We also can specify the shapes of the types we are passing into a generic function.

```TypeScript
// Specifying the types when calling the generic function
  const mergeObj3 = merge2<{ name: string }, { age: number }>(
    { name: 'Max' },
    { age: 30 }
  );
  console.log(mergeObj3); // { name: 'Max', age: 30 }
```

**Benefits of using Generics**

Generics offer several benefits in TypeScript:

- **Code Reusability**: Generics allow us to create components that can work with different types of data, making our code more reusable and reducing duplication.
- **Type Safety**: By using generics, we can maintain static type-checking and ensure that the code operates on the correct types. This helps catch potential errors at compile-time.
- **Flexibility**: Generics provide flexibility in handling different types of data without sacrificing type safety. They allow us to create more generalized methods that accurately represent the types used.

## TypeScript Built-in Generics**

TypeScript provides built-in generics for various data structures and utility types. These built-in generics offer flexibility and type safety when working with different types of data. Here are some examples of TypeScript's built-in generics:

`Array<T>`
   
The `Array<T>` type allows us to create arrays of a specific type `T`. We can declare an array of a specific type by using angle brackets (`<>`) and specifying the type inside. For example, `number[]` represents an array of `numbers`, and `string[]` represents an array of `strings`. We can also use the generic syntax `Array<T>` to achieve the same result. Here's an example:

```TypeScript
const numbers: number[] = [1, 2, 3];
const strings: Array<string> = ["hello", "world"];
```

Union types are also allowed when declaring a generics variable.

```TypeScript
const values: Array<string | number> = [];
```

`Partial<T>`

The `Partial<T>` type is a utility type that allows us to create a new type with all properties of `T` set to optional. This is useful when we want to create a type with optional properties based on an existing type. Here's an example:

```TypeScript
interface Person {
  name: string;
  age: number;
}

const partialPerson: Partial<Person> = { name: "John" };
```
In this example, `partialPerson` is of type `Partial<Person>`, which means that both `name` and `age` properties are optional.

`Readonly<T>`

The `Readonly<T>` type is another utility type that creates a new type where all properties of `T` are set to be `readonly`. This ensures that the properties cannot be modified after initialization. Here's an example:

```TypeScript
interface Point {
  x: number;
  y: number;
}

const readonlyPoint: Readonly<Point> = { x: 1, y: 2 };
```
In this example, `readonlyPoint` is of type `Readonly<Point>`, which means that the `x` and `y` properties cannot be modified.

`Promise<T>`

Generics can be used effectively with the `Promise` type in TypeScript to provide type safety and ensure proper handling of asynchronous operations. By using generics, we can specify the type of the resolved value that the `Promise` will eventually return.

Here's an example of using generics with the `Promise` type:

```TypeScript
function fetchData(): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    // Fetch data asynchronously
    // Resolve with a string value
    resolve("Data fetched successfully");
  });
}

fetchData().then((data: string) => {
  console.log(data); // Output: Data fetched successfully
});

```
In this example, the fetchData function returns a `Promise<string>`, indicating that it will eventually resolve with a string value. By specifying the generic type string, TypeScript ensures that we handle the resolved value as a string in the then callback.

Using generics with the `Promise` type allows us to benefit from TypeScript's type checking and catch potential errors at compile-time. It helps improve code quality, minimize runtime errors, and ensures a stable and reliable TypeScript project.

To get a complete list of built-in generics and utility types see [Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html) documentation.

## Working with Constraints

In TypeScript, constraints in generics allow us to specify certain requirements or limitations on the types that can be used as type arguments for a generic type or function. Constraints ensure type safety and enhance code predictability by narrowing down the possibilities of what a generic type could be.

To define constraints on generics, we use the extends keyword followed by the type or interface that the generic type parameter must extend or implement. This ensures that the generic type parameter meets certain criteria, such as implementing a particular interface, having a specific method, or extending a specific class.

Here's an example of using constraints in TypeScript generics:

```TypeScript
interface Lengthy {
  length: number;
}

function logLength<T extends Lengthy>(input: T): void {
  console.log(input.length);
}

logLength("Hello"); // Output: 5
logLength([1, 2, 3]); // Output: 3
logLength({ length: 10 }); // Output: 10
```

In this example, the `logLength` function takes an input object that implements the Lengthy interface, which requires the object to have a length property of type number. By using the constraint T extends Lengthy, TypeScript ensures that only objects with a length property can be passed as arguments to the function.

Constraints help enforce type safety and prevent potential runtime errors by limiting the types that can be used with generics. They allow us to write more reliable and maintainable code when working with generic types in TypeScript.

## The `keyof` Constraint

The keyof constraint in TypeScript generics is used to restrict the generic type parameter to be one of the keys of a specific object type. It allows us to create more precise and type-safe generic functions or types that operate on specific keys of an object.

By using the keyof constraint, we can ensure that the generic type parameter is limited to the keys of an object type, preventing us from using invalid keys and providing better type checking.

Here's an example of using the keyof keyword in TypeScript:

```TypeScript
interface Person {
  name: string;
  age: number;
  address: string;
}

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const person: Person = {
  name: "John",
  age: 30,
  address: "123 Main St",
};

const nameValue = getProperty(person, "name"); // Type: string
const ageValue = getProperty(person, "age"); // Type: number
const addressValue = getProperty(person, "address"); // Type: string
```

In this example, the `getProperty` function takes an object obj of type `T` and a key of type `K`, where `K` is constrained to be one of the keys of `T` using keyof `T`. The function returns the value of the property corresponding to the provided key.

By using the `keyof` constraint, TypeScript ensures that only valid keys of the object type `T` can be passed as arguments to the `getProperty` function. This provides type safety and prevents potential runtime errors when accessing properties dynamically.

The `keyof` constraint is a powerful feature in TypeScript generics that allows us to work with specific keys of an object type in a type-safe manner. It helps improve code quality and provides better type checking when working with generic functions or types that operate on object keys.

## Generic Classes

Generic classes in TypeScript allow us to create classes that can work with different types of data. They provide a way to define a class with placeholders or type parameters that can be replaced with specific types when creating instances of the class.

Here are some key points about generic classes in TypeScript:

- **Syntax**: To define a generic class, we use the class keyword followed by the class name and the type parameter(s) enclosed in angle brackets (`<>`). The type parameter(s) act as placeholders for the actual types that will be used when creating instances of the class.

- **Type Parameters**: Type parameters are declared within the angle brackets (`<>`) after the class name. They can be named anything, but it is common to use single uppercase letters such as `T`, `U`, etc. Type parameters allow us to specify the types that will be used for properties, methods, and constructors within the class.

- **Usage**: When creating an instance of a generic class, we provide the actual types that will replace the type parameters. This allows us to create instances of the class with different types, providing flexibility and reusability.

- **Constraints**: We can apply constraints to the type parameters of a generic class to restrict the types that can be used. Constraints ensure that the types used with the generic class meet certain requirements, such as implementing specific interfaces or having certain properties or methods.

- **Methods and Properties**: Generic classes can have methods and properties that use the type parameters declared for the class. This allows the class to work with the specified types dynamically.

Here's an example of a generic class in TypeScript:

```TypeScript
class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }
}

const numberStack = new Stack<number>();
numberStack.push(1);
numberStack.push(2);
console.log(numberStack.pop()); // Output: 2

const stringStack = new Stack<string>();
stringStack.push("Hello");
stringStack.push("World");
console.log(stringStack.pop()); // Output: "World"
```

In this example, the `Stack` class is defined as a generic class with a type parameter `T`. The class has methods to push and pop items of type `T` from an internal array. We create instances of the Stack class with different types (`number` and `string`) and perform operations specific to those types.

Generic classes in TypeScript provide a powerful way to create reusable and flexible code that can work with different types. They allow us to write more generic algorithms and data structures that can be used with various data types, enhancing code reusability and maintainability.

## Generic Parameter Defaults

Generic parameter defaults in TypeScript allow us to specify default types for the type parameters of a generic class or function. This means that if a specific type argument is not provided when using the generic class or function, the default type will be used instead.

Here's the syntax for specifying generic parameter defaults:

```TypeScript
class MyClass<T = DefaultType> {
  // class implementation
}

function myFunction<T = DefaultType>(arg: T): void {
  // function implementation
}
```
In the above syntax, `DefaultType` represents the default type that will be used if no type argument is explicitly provided.

Here's an example of using generic parameter defaults in TypeScript:

```TypeScript
class Box<T = string> {
  private value: T;

  constructor(value: T) {
    this.value = value;
  }

  getValue(): T {
    return this.value;
  }
}

const box1 = new Box<number>(10);
console.log(box1.getValue()); // Output: 10

const box2 = new Box(); // Default type 'string' is used
console.log(box2.getValue()); // Output: ""
```
In this example, the `Box` class is defined as a generic class with a type parameter `T` that defaults to `string`. The class has a private property value of type `T` and a method `getValue()` that returns the value of `value`. When creating an instance of `Box`, we can explicitly provide a type argument (`number` in the case of `box1`) or omit it to use the default type (`string` in the case of `box2`).

Generic parameter defaults provide flexibility and convenience when working with generic classes and functions. They allow us to define default types that are used when specific types are not provided, reducing the need for explicit type arguments in certain scenarios.

## Mapped Types

Mapped types in TypeScript are a feature that allows us to create new types by transforming, filtering, or slicing the properties of existing types. They provide a way to define types that are derived from other types, reducing code duplication and enhancing type safety.

Here are some key points about mapped types in TypeScript:

- **Syntax**: Mapped types are defined using the `{ [P in K]: T }` syntax, where `P` represents the property name, `K` represents a union of keys, and `T` represents the transformed type. The mapped type iterates over each key in `K` and creates a new property with the transformed type `T`.

- **Transformation**: Mapped types allow us to transform the types of properties. For example, we can change the property type to be read-only, optional, or a different type altogether. We can also add or remove modifiers like `readonly` or `?` to affect mutability and optionality.

- **Keyof Operator**: The `keyof` operator is often used in conjunction with mapped types. It allows us to obtain a union of all known, public property names of a given type. This union of keys can then be used in mapped types to iterate over the properties.

- **Utility Types**: TypeScript provides utility types like `Partial`, `Readonly`, and `Pick` that are built using mapped types. These utility types allow us to create new types based on existing types with specific transformations.

**Example**

Mapped types build on the syntax for index signatures, which are used to declare the types of properties which have not been declared ahead of time:

```TypeScript
type OnlyBoolsAndHorses = {
  [key: string]: boolean | Horse;
};
 
const conforms: OnlyBoolsAndHorses = {
  del: true,
  rodney: false,
};
```

A mapped type is a generic type which uses a union of PropertyKeys (frequently created via a `keyof` keyword) to iterate through keys to create a type:

```TypeScript
type OptionsFlags<Type> = {
  [Property in keyof Type]: boolean;
};

type Features = {
  darkMode: () => void;
  newUserProfile: () => void;
};
 
type FeatureOptions = OptionsFlags<Features>;
```
In this example, `OptionsFlags` will take all the properties from the type `Type` and change their values to be a `boolean`.

## Mapping Modifiers

There are two additional modifiers which can be applied during mapping: readonly and ? which affect mutability and optionality respectively.

You can remove or add these modifiers by prefixing with - or +. If you don’t add a prefix, then + is assumed.

```TypeScript
// Removes 'readonly' attributes from a type's properties
type CreateMutable<Type> = {
  -readonly [Property in keyof Type]: Type[Property];
};
 
type LockedAccount = {
  readonly id: string;
  readonly name: string;
};
 
type UnlockedAccount = CreateMutable<LockedAccount>;

// Removes 'optional' attributes from a type's properties
type Concrete<Type> = {
  [Property in keyof Type]-?: Type[Property];
};
 
type MaybeUser = {
  id: string;
  name?: string;
  age?: number;
};
 
type User = Concrete<MaybeUser>;
```

## Key Remapping via as

In TypeScript 4.1 and onwards, you can re-map keys in mapped types with an `as` clause in a mapped type:

Here's an example of using the as keyword for key remapping in a mapped type:

```TypeScript
type OriginalType = {
  prop1: number;
  prop2: string;
};

type RemappedType = {
  newProp1: number;
  newProp2: string;
};

type ResultType = {
  [K in keyof OriginalType]: RemappedType[K] as `new${string & K}`;
};

/*
ResultType will be:
{
  newProp1: number;
  newProp2: string;
}
*/
```
In this example, we have an `OriginalType` with properties prop1 and prop2. We want to create a `ResultType` where the properties have different names, prefixed with "new". We use the `as` keyword to specify the new property names using template literal strings.

You can filter out keys by producing never via a conditional type:

```TypeScript
// Remove the 'kind' property
type RemoveKindField<Type> = {
    [Property in keyof Type as Exclude<Property, "kind">]: Type[Property]
};
 
interface Circle {
    kind: "circle";
    radius: number;
}
 
type KindlessCircle = RemoveKindField<Circle>;
```
In this example, we define a generic type `RemoveKindField` that takes a type parameter `Type`. The `RemoveKindField` type is a mapped type that iterates over each property `Property` in the `Type` and creates a new type where the `kind` property is excluded.

In the provided example, the expression `Exclude<Property, "kind">` is used within the mapped type to exclude the property with the name "kind" from the resulting type.

The `Exclude` utility type is a built-in TypeScript utility type that takes two type parameters: `T` and `U`. It creates a new type that includes only the keys from `T` that are not assignable to `U`. In other words, it removes the keys from `T` that are the same as `U`.

We then define an interface `Circle` with properties `kind` and `radius`. The kind property has a literal type of "circle".

Finally, we create a type `KindlessCircle` by instantiating the `RemoveKindField` generic type with the `Circle` interface. This results in a new type where the `kind` property is removed.

The resulting `KindlessCircle` type will be:

```TypeScript
type KindlessCircle = {
    radius: number;
}
```

You can map over arbitrary unions, not just unions of string | number | symbol, but unions of any type:

```TypeScript
type EventConfig<Events extends { kind: string }> = {
    [E in Events as E["kind"]]: (event: E) => void;
}
 
type SquareEvent = { kind: "square", x: number, y: number };
type CircleEvent = { kind: "circle", radius: number };
 
type Config = EventConfig<SquareEvent | CircleEvent>
```
In this example we define a generic type `EventConfig` that takes a type parameter `Events` which extends an object type with a `kind` property of type `string`. The `EventConfig` type is a mapped type that maps each `kind` property value to a corresponding function type that takes an `event` of that specific kind and returns `void`.

We then define two specific event types: `SquareEvent` and `CircleEvent`, each with their own set of properties.

Finally, we create a type `Config` by instantiating the `EventConfig` generic type with the union type `SquareEvent | CircleEvent`. This results in a mapped type where the keys are the `kind` property values ("square" and "circle") and the values are the corresponding function types.

The resulting Config type will be:

```TypeScript
type Config = {
    square: (event: SquareEvent) => void;
    circle: (event: CircleEvent) => void;
}
```
This means that the Config type defines two properties: square and circle, where each property is a function that takes the respective event type and returns void.

> [!IMPORTANT]
> It's important to note that the `as` keyword in this context is used for remapping keys in a mapped type and is not related to type assertions. The `as` keyword is used to provide a specific mapping for each key during the iteration process.

The `as` keyword in mapped types provides flexibility in creating new types with remapped keys, allowing us to customize the resulting type according to our specific requirements.

## Template Literal Types 

Template literal types in TypeScript, introduced in TypeScript 4.1, allow us to create new string literal types by concatenating or transforming existing string literal types. They provide a way to generate new string literal types based on patterns or templates.

Here are some key points about template literal types in TypeScript:

- **Syntax**: Template literal types use backticks (`) to enclose the template string. Inside the template string, we can use placeholders ${} to include expressions or other string literal types.

- **Concatenation**: Template literal types can be used to concatenate multiple string literal types into a single string literal type. This allows us to create more expressive and precise types by combining different parts of strings.

- **Transformation**: Template literal types can also be used to transform or manipulate existing string literal types. By using expressions or conditional logic inside the template string, we can modify the resulting string literal type based on certain conditions or rules.

- **Usage**: Template literal types are often used in conjunction with mapped types to dynamically generate property names or create complex type patterns. They can be particularly useful when working with APIs, generating URLs, or creating type-safe DSLs (Domain-Specific Languages).

**Examples**

```TypeScript
type APIEndpoint = "users" | "posts" | "comments";

type EndpointURL<T extends APIEndpoint> = `https://api.example.com/${T}`;

const userEndpoint: EndpointURL<"users"> = "https://api.example.com/users";
const postEndpoint: EndpointURL<"posts"> = "https://api.example.com/posts";
const commentEndpoint: EndpointURL<"comments"> = "https://api.example.com/comments";
```

In this example, we define an `APIEndpoint` type that represents a union of possible API endpoints. We then create a `EndpointURL` type using a template literal type to generate the URL for each endpoint. The resulting type is a string literal type that concatenates the base URL with the specific endpoint.

You can leverage features like template literal types to create new property names from prior ones:

```TypeScript
type Getters<Type> = {
    [Property in keyof Type as `get${Capitalize<string & Property>}`]: () => Type[Property]
};
 
interface Person {
    name: string;
    age: number;
    location: string;
}
 
type LazyPerson = Getters<Person>;
```

Template literal types provide a powerful way to create precise and expressive string literal types in TypeScript. They allow us to generate new types based on patterns or templates, enhancing type safety and code readability.

---

[[<< Previous]](../Chapter-06/README.md) [[^Top]](#chapter-7-generics) [[Next >>]](../Chapter-08/README.md)