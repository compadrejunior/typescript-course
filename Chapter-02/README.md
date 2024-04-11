# Chapter 2: TypeScript Basics and Types

- [Chapter 2: TypeScript Basics and Types](#chapter-2-typescript-basics-and-types)
  - [Core Types](#core-types)
  - [TypeScript Types vs JavaScript Types](#typescript-types-vs-javascript-types)
  - [Working with Numbers, Strings \& Booleans](#working-with-numbers-strings--booleans)
  - [Type Assignment and Type Inference](#type-assignment-and-type-inference)
  - [Object Types](#object-types)
  - [Array Types](#array-types)
  - [Tuples](#tuples)
  - [Enum](#enum)
  - [The `any` Type](#the-any-type)
  - [Type Annotations on Variables](#type-annotations-on-variables)
  - [Union Types](#union-types)
  - [Literal Types](#literal-types)
  - [Type Aliases](#type-aliases)
  - [Functions](#functions)
  - [The `unknown` Type](#the-unknown-type)
  - [The `never` Type](#the-never-type)

## Core Types

JavaScript has three very commonly used [primitives](https://developer.mozilla.org/en-US/docs/Glossary/Primitive): `string`, `number`, and `boolean`. Each has a corresponding type in TypeScript. As you might expect, these are the same names you’d see if you used the JavaScript `typeof` operator on a value of those types:

| number | 1, 5.3, -10 | All numbers, no differentiation between integer or floats |
| --- | --- | --- |
| string | ‘Hi’, “Hi”, `Hi` | All text values |
| boolean | true, false | Just these two, no “truthy” or “falsy” values |

> [!NOTE] The type names `String`, `Number`, and `Boolean` (starting with capital letters) are legal, but refer to some special built-in types that will very rarely appear in your code. *Always* use `string`, `number`, or `boolean` for types.

**With JavaScript:** we use dynamic typing, that means, JavaScript will infer the type of a variable during the assignment, on the runtime only. So we only know errors when we run the code.

```jsx
// Add two numbers
function add(n1, n2) {
  return n1 + n2;
}

let number1 = 5;
let number2 = 2.8;

let result = add(number1, number2);
console.log(result);

// Output 7.8

// If we change the number1 to be a string we get an string concatenation
// instead
let number1 = '5';
result = add(number1, number2);
console.log(result);
// Output => 52.8
```

**With types** we can avoid these errors specifying the types to the parameters which will lead to an error if the inputs are not of the expected types:

```TypeScript
// Add two numbers
function add(n1: number, n2: number) {
  return n1 + n2;
}

let number1 = '5';
let number2 = 2.8;

let result = add(number1, number2); // error, expected number but got a string
console.log(result);
```

> [!IMPORTANT] TypeScript type system only helps during development (i.e. before the code gets compiled)

> [!TIP] The use of `const` keyword defines a value that will be assigned once an never change. When you need to change the value of a variable we use the keyword `let`.

## TypeScript Types vs JavaScript Types

To check values during runtime we can use the `typeof` operator.

Checking the types of parameters during runtime in JavaScript

```jsx
// Add two numbers
function add(n1, n2) {
  if (typeof n1 !== 'number' || typeof n2 !== 'number') {
    // Throws an error if parameters are not number
    throw new Error('Incorrect input');
  }
  return n1 + n2;
}
```

In TypeScript we can also check the types of parameters during runtime with the `typeof` operator. But it’s not necessary, since TypeScript will check during compile time. Also, if we use an editor such as Visual Studio Code, the editor will show errors as you write the code.

> [!NOTE] The key difference is: JavaScript uses _dynamic types_ (resolved at runtime), TypeScript uses _static types_ (set during development)

## Working with Numbers, Strings & Booleans

Adding boolean variables to our code

```TypeScript
// Add two numbers, check the number types during runtime and check if
//   the output should be printed.
function add(n1: number, n2: number, printResult: boolean) {
  // Throws an error if parameters are not number
  if (typeof n1 !== 'number' || typeof n2 !== 'number') {
    throw new Error('Incorrect input');
  }
  const result = n1 + n2;
  // check if the output should be printed.
  if (printResult) console.log(result);
  return result;
}

const number1 = 5;
const number2 = 2.8;

add(number1, number2, true); // true define that the output should be printed
// Output => 52.8
```

Add a text to the printed output

```TypeScript
// Add two numbers, check the number types during runtime,
//  check if the output should be printed,
//  and let the caller specify a phrase to the output.
function add(n1: number, n2: number, printResult: boolean, phrase: string) {
  // Throws an error if parameters are not number
  if (typeof n1 !== 'number' || typeof n2 !== 'number') {
    throw new Error('Incorrect input');
  }
  const result = n1 + n2;
  // check if the output should be printed.
  if (printResult) console.log(phase + result);
  return result;
}

const number1 = 5;
const number2 = 2.8;

add(number1, number2, true, 'Result is: ');
// Output => Result is: 52.8
```

## Type Assignment and Type Inference

**Type Assignment** is the process of explicitly specifying the type of a variable, function parameter, or function return value. When you assign a type to a variable, TypeScript will enforce that the variable only holds values of that specific type. Here's an example:

```TypeScript
let counter: number;
counter = 10; // valid assignment
counter = 'hello'; // error: Type 'string' is not assignable to type 'number'
```

In the above example, the variable `counter` is explicitly assigned the type `number`. TypeScript will enforce that only numeric values can be assigned to `counter`.

**Type Inference** is the process by which TypeScript automatically determines the type of a variable, function parameter, or function return value based on its initialization or usage. When you don't explicitly assign a type, TypeScript infers the type based on the value or context. Here are a few examples:

```TypeScript
let counter = 10; // inferred type: number
let name = 'John'; // inferred type: string

function add(a: number, b: number) {
  return a + b;
}
// inferred return type: number
```

In the above examples, TypeScript infers the types of the variables `counter` and `name` based on their initial values. It also infers the return type of the `add` function based on the types of its parameters and the usage of the `+` operator.

Type inference also works in the other direction in some cases, known as **contextual typing**. Contextual typing occurs when the type of an expression is implied by its location. For example:

```TypeScript
let numbers = [1, 2, 3]; // inferred type: number[]
let firstNumber = numbers[0]; // inferred type: number
```

In the above example, TypeScript infers the type of the `numbers` array as `number[]` based on the values it contains. It also infers the type of the `firstNumber` variable as `number` based on its usage as an array element.

It's important to note that type inference is not always possible or may not always produce the desired result. In such cases, it's recommended to use explicit type annotations to ensure the desired types are assigned.

## Object Types

In JavaScript, the fundamental way that we group and pass around data is through objects. In TypeScript, we represent those through *object types*.

Objects can be anonymous:

```TypeScript
// TypeScript inferred person as object type
function greet(person: { name: string; age: number }) {
  return "Hello " + person.name;
}

// We can also be explicit when declaring an object type
const person: object = {
	name: string;
	age: number;
}
```

or they can be named by using either an interface:

```TypeScript
interface Person {
  name: string;
  age: number;
}

function greet(person: Person) {
  return 'Hello ' + person.name;
}
```

or a type alias:

```TypeScript
type Person = {
  name: string;
  age: number;
};

function greet(person: Person) {
  return 'Hello ' + person.name;
}
```

In all three examples above, we’ve written functions that take objects that contain the property `name` (which must be a `string`) and `age` (which must be a `number`).

We can also declare and assign values to objects types at the same time:

```TypeScript
const person: {
  name: string;
} = {
  name: 'Maximilian',
};
```

> [!NOTE] For anonymous objects (non-interface or non-alias type), the inferred declaration is always preferred, since we won’t be reusing the type anywhere else. On the other hand, if we do need to reuse the same object structure somewhere else, the interface or alias type are preferred.

## Array Types

TypeScript, like JavaScript, allows you to work with arrays of values. Array types can be written in one of two ways. In the first, you use the type of the elements followed by `[]` to denote an array of that element type:

```TypeScript
let list: number[] = [1, 2, 3];
```

The second way uses a generic array type, `Array<elemType>`:

```TypeScript
let list: Array<number> = [1, 2, 3];
```

We can iterate through an array of values using the `for… of` keywords:

```TypeScript
let activities: string[] = ['Sports', 'Travel', 'Party'];

for (const activity of activities) {
  console.log(activity);
}
```

We can leverage TypeScript inference when using arrays to benefit from common string functions.

```TypeScript
let activities: string[] = ['Sports', 'Travel', 'Party'];

for (const activity of activities) {
  // Use toUpperCase string function in an array
  console.log(activity.toUpperCase());
}
```

TypeScript knows that activity is an array of strings, so we can call any string function on an array element.

## Tuples

Tuple types allow you to express an array with **a fixed number of elements** whose types are known, but need not be the same. For example, you may want to represent a value as a pair of a `string` and a `number`:

```TypeScript
// Declare a tuple type
let x: [string, number];
// Initialize it
x = ['hello', 10]; // OK
// Initialize it incorrectly
x = [10, 'hello']; // Error
// Type 'number' is not assignable to type 'string'.
// Type 'string' is not assignable to type 'number'.
```

When accessing an element with a known index, the correct type is retrieved:

```TypeScript
// OK
console.log(x[0].substring(1));
// Property 'substring' does not exist on type 'number'.
console.log(x[1].substring(1));
```

Accessing an element outside the set of known indices fails with an error:

```TypeScript
x[3] = 'world';
// Tuple type '[string, number]' of length '2' has no element at index '3'.
console.log(x[5].toString());
// Object is possibly 'undefined'.
// Tuple type '[string, number]' of length '2' has no element at index '5'.
```

## Enum

Enums are one of the few features TypeScript has which is not a type-level extension of JavaScript.

Enums allow a developer to define a set of named constants. Using enums can make it easier to document intent, or create a set of distinct cases. TypeScript provides both numeric and string-based enums.

**Numeric enums**

We’ll first start off with numeric enums, which are probably more familiar if you’re coming from other languages. An enum can be defined using the `enum` keyword.

```TypeScript
enum Direction {
  Up = 1,
  Down,
  Left,
  Right,
}
```

Above, we have a numeric enum where `Up` is initialized with `1`. All of the following members are auto-incremented from that point on. In other words, `Direction.Up` has the value `1`, `Down` has `2`, `Left` has `3`, and `Right` has `4`.

If we wanted, we could leave off the initializers entirely:

```TypeScript
enum Direction {
  Up,
  Down,
  Left,
  Right,
}
```

Here, `Up` would have the value `0`, `Down` would have `1`, etc. This auto-incrementing behavior is useful for cases where we might not care about the member values themselves, but do care that each value is distinct from other values in the same enum.

Using an enum is simple: just access any member as a property off of the enum itself, and declare types using the name of the enum:

```TypeScript
enum UserResponse {
  No = 0,
  Yes = 1,
}

function respond(recipient: string, message: UserResponse): void {
  // ...
}

respond('Princess Caroline', UserResponse.Yes);
```

Numeric enums can be mixed in [computed and constant members (see below)](https://www.typescriptlang.org/docs/handbook/enums.html#computed-and-constant-members). The short story is, enums without initializers either need to be first, or have to come after numeric enums initialized with numeric constants or other constant enum members. In other words, the following isn’t allowed:

```TypeScript
enum E {
  A = getSomeValue(),
  B,
  // Enum member must have initializer.
}
```

**String enums**

String enums are a similar concept, but have some subtle [runtime differences](https://www.typescriptlang.org/docs/handbook/enums.html#enums-at-runtime) as documented below. In a string enum, each member has to be constant-initialized with a string literal, or with another string enum member.

```TypeScript
enum Direction {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT',
}
```

While string enums don’t have auto-incrementing behavior, string enums have the benefit that they “serialize” well. In other words, if you were debugging and had to read the runtime value of a numeric enum, the value is often opaque - it doesn’t convey any useful meaning on its own (though [reverse mapping](https://www.typescriptlang.org/docs/handbook/enums.html#reverse-mappings) can often help). String enums allow you to give a meaningful and readable value when your code runs, independent of the name of the enum member itself.

**Heterogeneous enums**

Technically enums can be mixed with string and numeric members, but it’s not clear why you would ever want to do so:

```TypeScript
enum BooleanLikeHeterogeneousEnum {
  No = 0,
  Yes = 'YES',
}
```

Unless you’re really trying to take advantage of JavaScript’s runtime behavior in a clever way, it’s advised that you don’t do this.

**Computed and constant members**

Each enum member has a value associated with it which can be either *constant* or *computed*. An enum member is considered constant if:

- It is the first member in the enum and it has no initializer, in which case it’s assigned the value `0`:

  ```TypeScript
  // E.X is constant:
  enum E {
    X,
  }
  ```

- It does not have an initializer and the preceding enum member was a *numeric* constant. In this case the value of the current enum member will be the value of the preceding enum member plus one.

  ```TypeScript
  // All enum members in 'E1' and 'E2' are constant.

  enum E1 {
    X,
    Y,
    Z,
  }

  enum E2 {
    A = 1,
    B,
    C,
  }
  ```

- The enum member is initialized with a constant enum expression. A constant enum expression is a subset of TypeScript expressions that can be fully evaluated at compile time. An expression is a constant enum expression if it is:
  1. a literal enum expression (basically a string literal or a numeric literal)
  2. a reference to previously defined constant enum member (which can originate from a different enum)
  3. a parenthesized constant enum expression
  4. one of the `+`, ``, `~` unary operators applied to constant enum expression
  5. `+`, `, `, `/`, `%`, `<<`, `>>`, `>>>`, `&`, `|`, `^` binary operators with constant enum expressions as operands It is a compile time error for constant enum expressions to be evaluated to `NaN` or `Infinity`.

In all other cases enum member is considered computed.

```TypeScript
enum FileAccess {
  // constant members
  None,
  Read = 1 << 1,
  Write = 1 << 2,
  ReadWrite = Read | Write,
  // computed member
  G = '123'.length,
}
```

**Union enums and enum member types**

There is a special subset of constant enum members that aren’t calculated: literal enum members. A literal enum member is a constant enum member with no initialized value, or with values that are initialized to

- any string literal (e.g. `"foo"`, `"bar"`, `"baz"`)
- any numeric literal (e.g. `1`, `100`)
- a unary minus applied to any numeric literal (e.g. `1`, `100`)

When all members in an enum have literal enum values, some special semantics come into play.

The first is that enum members also become types as well! For example, we can say that certain members can *only* have the value of an enum member:

```TypeScript
enum ShapeKind {
  Circle,
  Square,
}

interface Circle {
  kind: ShapeKind.Circle;
  radius: number;
}

interface Square {
  kind: ShapeKind.Square;
  sideLength: number;
}

let c: Circle = {
  kind: ShapeKind.Square,
  // Type 'ShapeKind.Square' is not assignable to type 'ShapeKind.Circle'.
  radius: 100,
};
```

The other change is that enum types themselves effectively become a *union* of each enum member. With union enums, the type system is able to leverage the fact that it knows the exact set of values that exist in the enum itself. Because of that, TypeScript can catch bugs where we might be comparing values incorrectly. For example:

```TypeScript
enum E {
  Foo,
  Bar,
}

function f(x: E) {
  if (x !== E.Foo || x !== E.Bar) {
    // This comparison appears to be unintentional because the types 'E.Foo' and 'E.Bar' have no overlap.
    //
  }
}
```

In that example, we first checked whether `x` was *not* `E.Foo`. If that check succeeds, then our `||` will short-circuit, and the body of the ‘if’ will run. However, if the check didn’t succeed, then `x` can *only* be `E.Foo`, so it doesn’t make sense to see whether it’s *not* equal to `E.Bar`.

**Enums at runtime**

Enums are real objects that exist at runtime. For example, the following enum

```TypeScript
enum E {
  X,
  Y,
  Z,
}
```

can actually be passed around to functions

```TypeScript
enum E {
  X,
  Y,
  Z,
}

function f(obj: { X: number }) {
  return obj.X;
}

// Works, since 'E' has a property named 'X' which is a number.
f(E);
```

**Enums at compile time**

Even though Enums are real objects that exist at runtime, the `keyof` keyword works differently than you might expect for typical objects. Instead, use `keyof typeof` to get a Type that represents all Enum keys as strings.

```TypeScript
enum LogLevel {
  ERROR,
  WARN,
  INFO,
  DEBUG,
}

/**
 * This is equivalent to:
 * type LogLevelStrings = 'ERROR' | 'WARN' | 'INFO' | 'DEBUG';
 */
type LogLevelStrings = keyof typeof LogLevel;

function printImportant(key: LogLevelStrings, message: string) {
  const num = LogLevel[key];
  if (num <= LogLevel.WARN) {
    console.log('Log level key is:', key);
    console.log('Log level value is:', num);
    console.log('Log level message is:', message);
  }
}
printImportant('ERROR', 'This is a message');
```

**Reverse mappings**

In addition to creating an object with property names for members, numeric enums members also get a *reverse mapping* from enum values to enum names. For example, in this example:

```TypeScript
enum Enum {
  A,
}

let a = Enum.A;
let nameOfA = Enum[a]; // "A"
```

TypeScript compiles this down to the following JavaScript:

```jsx
'use strict';
var Enum;
(function (Enum) {
  Enum[(Enum['A'] = 0)] = 'A';
})(Enum || (Enum = {}));
let a = Enum.A;
let nameOfA = Enum[a]; // "A"
```

In this generated code, an enum is compiled into an object that stores both forward (`name` -> `value`) and reverse (`value` -> `name`) mappings. References to other enum members are always emitted as property accesses and never inlined.

Keep in mind that string enum members *do not* get a reverse mapping generated at all.

**`const` enums**

In most cases, enums are a perfectly valid solution. However sometimes requirements are tighter. To avoid paying the cost of extra generated code and additional indirection when accessing enum values, it’s possible to use `const` enums. Const enums are defined using the `const` modifier on our enums:

```jsx
const enum Enum {
  A = 1,
  B = A * 2,
}
```

Const enums can only use constant enum expressions and unlike regular enums they are completely removed during compilation. Const enum members are inlined at use sites. This is possible since const enums cannot have computed members.

```TypeScript
const enum Direction {
  Up,
  Down,
  Left,
  Right,
}

let directions = [
  Direction.Up,
  Direction.Down,
  Direction.Left,
  Direction.Right,
];
```

in generated code will become

```jsx
'use strict';
let directions = [
  0 /* Direction.Up */, 1 /* Direction.Down */, 2 /* Direction.Left */,
  3 /* Direction.Right */,
];
```

**Const enum pitfalls**

Inlining enum values is straightforward at first, but comes with subtle implications. These pitfalls pertain to *ambient* const enums only (basically const enums in `.d.ts` files) and sharing them between projects, but if you are publishing or consuming `.d.ts` files, these pitfalls likely apply to you, because `tsc --declaration` transforms `.ts` files into `.d.ts` files.

1. For the reasons laid out in the `[isolatedModules` documentation](https://www.typescriptlang.org/tsconfig#references-to-const-enum-members), that mode is fundamentally incompatible with ambient const enums. This means if you publish ambient const enums, downstream consumers will not be able to use `[isolatedModules](https://www.typescriptlang.org/tsconfig#isolatedModules)` and those enum values at the same time.
2. You can easily inline values from version A of a dependency at compile time, and import version B at runtime. Version A and B’s enums can have different values, if you are not very careful, resulting in [surprising bugs](https://github.com/microsoft/TypeScript/issues/5219#issue-110947903), like taking the wrong branches of `if` statements. These bugs are especially pernicious because it is common to run automated tests at roughly the same time as projects are built, with the same dependency versions, which misses these bugs completely.
3. `[importsNotUsedAsValues: "preserve"](https://www.typescriptlang.org/tsconfig#importsNotUsedAsValues)` will not elide imports for const enums used as values, but ambient const enums do not guarantee that runtime `.js` files exist. The unresolvable imports cause errors at runtime. The usual way to unambiguously elide imports, [type-only imports](https://www.typescriptlang.org/docs/handbook/modules.html#importing-types), [does not allow const enum values](https://github.com/microsoft/TypeScript/issues/40344), currently.

Here are two approaches to avoiding these pitfalls:

1. Do not use const enums at all. You can easily [ban const enums](https://typescript-eslint.io/linting/troubleshooting#how-can-i-ban-specific-language-feature) with the help of a linter. Obviously this avoids any issues with const enums, but prevents your project from inlining its own enums. Unlike inlining enums from other projects, inlining a project’s own enums is not problematic and has performance implications.
2. Do not publish ambient const enums, by deconstifying them with the help of `[preserveConstEnums](https://www.typescriptlang.org/tsconfig#preserveConstEnums)`. This is the approach taken internally by the [TypeScript project itself](https://github.com/microsoft/TypeScript/pull/5422). `[preserveConstEnums](https://www.typescriptlang.org/tsconfig#preserveConstEnums)` emits the same JavaScript for const enums as plain enums. You can then safely strip the `const` modifier from `.d.ts` files [in a build step](https://github.com/microsoft/TypeScript/blob/1a981d1df1810c868a66b3828497f049a944951c/Gulpfile.js#L144).

   This way downstream consumers will not inline enums from your project, avoiding the pitfalls above, but a project can still inline its own enums, unlike banning const enums entirely.

**Ambient enums**

Ambient enums are used to describe the shape of already existing enum types.

```TypeScript
declare enum Enum {
  A = 1,
  B,
  C = 2,
}
```

One important difference between ambient and non-ambient enums is that, in regular enums, members that don’t have an initializer will be considered constant if its preceding enum member is considered constant. By contrast, an ambient (and non-const) enum member that does not have an initializer is *always* considered computed.

**Objects vs Enums**

In modern TypeScript, you may not need an enum when an object with `as const` could suffice:

```TypeScript
const enum EDirection {
  Up,
  Down,
  Left,
  Right,
}

const ODirection = {
  Up: 0,
  Down: 1,
  Left: 2,
  Right: 3,
} as const;

EDirection.Up; // (enum member) EDirection.Up = 0

ODirection.Up; // (property) Up: 0

// Using the enum as a parameter
function walk(dir: EDirection) {}

// It requires an extra line to pull out the values
type Direction = (typeof ODirection)[keyof typeof ODirection];
function run(dir: Direction) {}

walk(EDirection.Left);
run(ODirection.Right);
```

The biggest argument in favor of this format over TypeScript’s `enum` is that it keeps your codebase aligned with the state of JavaScript, and [when/if](https://github.com/rbuckton/proposal-enum) enums are added to JavaScript then you can move to the additional syntax.

## The `any` Type

TypeScript also has a special type, `any`, that you can use whenever you don’t want a particular value to cause typechecking errors.

When a value is of type `any`, you can access any properties of it (which will in turn be of type `any`), call it like a function, assign it to (or from) a value of any type, or pretty much anything else that’s syntactically legal:

```TypeScript
let obj: any = { x: 0 };
// None of the following lines of code will throw compiler errors.
// Using `any` disables all further type checking, and it is assumed
// you know the environment better than TypeScript.
obj.foo();
obj();
obj.bar = 100;
obj = 'hello';
const n: number = obj;
```

The `any` type is useful when you don’t want to write out a long type just to convince TypeScript that a particular line of code is okay.

**`noImplicitAny`**

When you don’t specify a type, and TypeScript can’t infer it from context, the compiler will typically default to `any`.

You usually want to avoid this, though, because `any` isn’t type-checked. Use the compiler flag `[noImplicitAny](https://www.typescriptlang.org/tsconfig#noImplicitAny)` to flag any implicit `any` as an error.

## Type Annotations on Variables

When you declare a variable using `const`, `var`, or `let`, you can optionally add a type annotation to explicitly specify the type of the variable:

```TypeScript
let myName: string = 'Alice';
```

> [!TIP] TypeScript doesn’t use “types on the left”-style declarations like int x = 0; Type annotations will always go after the thing being typed.

In most cases, though, this isn’t needed. Wherever possible, TypeScript tries to automatically *infer* the types in your code. For example, the type of a variable is inferred based on the type of its initializer:

```TypeScript
// No type annotation needed -- 'myName' inferred as type 'string'
let myName = 'Alice';
```

For the most part you don’t need to explicitly learn the rules of inference. If you’re starting out, try using fewer type annotations than you think - you might be surprised how few you need for TypeScript to fully understand what’s going on.

## Union Types

TypeScript’s type system allows you to build new types out of existing ones using a large variety of operators. Now that we know how to write a few types, it’s time to start *combining* them in interesting ways.

**Defining a Union Type**

The first way to combine types you might see is a *union* type. A union type is a type formed from two or more other types, representing values that may be *any one* of those types. We refer to each of these types as the union’s *members*.

Let’s write a function that can operate on strings or numbers:

```TypeScript
function printId(id: number | string) {
  console.log('Your ID is: ' + id);
}
// OK
printId(101);
// OK
printId('202');
// Error
printId({ myID: 22342 });
// Argument of type '{ myID: number; }' is not assignable to parameter of type 'string | number'.
```

**Working with Union Types**

It’s easy to *provide* a value matching a union type - simply provide a type matching any of the union’s members. If you *have* a value of a union type, how do you work with it?

TypeScript will only allow an operation if it is valid for *every* member of the union. For example, if you have the union `string | number`, you can’t use methods that are only available on `string`:

```TypeScript
function printId(id: number | string) {
  console.log(id.toUpperCase());
  // Property 'toUpperCase' does not exist on type 'string | number'.
  // Property 'toUpperCase' does not exist on type 'number'.
}
```

The solution is to *narrow* the union with code, the same as you would in JavaScript without type annotations. *Narrowing* occurs when TypeScript can deduce a more specific type for a value based on the structure of the code.

For example, TypeScript knows that only a `string` value will have a `typeof` value `"string"`:

```TypeScript
function printId(id: number | string) {
  if (typeof id === 'string') {
    // In this branch, id is of type 'string'
    console.log(id.toUpperCase());
  } else {
    // Here, id is of type 'number'
    console.log(id);
  }
}
```

Another example is to use a function like `Array.isArray`:

```TypeScript
function welcomePeople(x: string[] | string) {
  if (Array.isArray(x)) {
    // Here: 'x' is 'string[]'
    console.log('Hello, ' + x.join(' and '));
  } else {
    // Here: 'x' is 'string'
    console.log('Welcome lone traveler ' + x);
  }
}
```

Notice that in the `else` branch, we don’t need to do anything special - if `x` wasn’t a `string[]`, then it must have been a `string`.

Sometimes you’ll have a union where all the members have something in common. For example, both arrays and strings have a `slice` method. If every member in a union has a property in common, you can use that property without narrowing:

```TypeScript
// Return type is inferred as number[] | string
function getFirstThree(x: number[] | string) {
  return x.slice(0, 3);
}
```

## Literal Types

In addition to the general types `string` and `number`, we can refer to *specific* strings and numbers in type positions.

One way to think about this is to consider how JavaScript comes with different ways to declare a variable. Both `var` and `let` allow for changing what is held inside the variable, and `const` does not. This is reflected in how TypeScript creates types for literals.

```TypeScript
let changingString = 'Hello World';
changingString = 'Hello Universe';
// Because `changingString` can represent any possible string, that
// is how TypeScript describes it in the type system
changingString;

let changingString: string;

const constantString = 'Hello World';
// Because `constantString` can only represent 1 possible string, it
// has a literal type representation
constantString;

const constantString: 'Hello World';
```

By themselves, literal types aren’t very valuable:

```TypeScript
let x: "hello" = "hello";
// OK
x = "hello";
// ...
x = "howdy";
Type '"howdy"' is not assignable to type '"hello"'.
```

It’s not much use to have a variable that can only have one value!

But by *combining* literals into unions, you can express a much more useful concept - for example, functions that only accept a certain set of known values:

```TypeScript
function printText(s: string, alignment: 'left' | 'right' | 'center') {
  // ...
}
printText('Hello, world', 'left');
printText("G'day, mate", 'centre');
// Argument of type '"centre"' is not assignable to parameter of type '"left" | "right" | "center"'.
```

Numeric literal types work the same way:

```TypeScript
function compare(a: string, b: string): -1 | 0 | 1 {
  return a === b ? 0 : a > b ? 1 : -1;
}
```

Of course, you can combine these with non-literal types:

```TypeScript
interface Options {
  width: number;
}
function configure(x: Options | 'auto') {
  // ...
}
configure({ width: 100 });
configure('auto');
configure('automatic');
// Argument of type '"automatic"' is not assignable to parameter of type 'Options | "auto"'.
```

There’s one more kind of literal type: boolean literals. There are only two boolean literal types, and as you might guess, they are the types `true` and `false`. The type `boolean` itself is actually just an alias for the union `true | false`.

**Literal Inference**

When you initialize a variable with an object, TypeScript assumes that the properties of that object might change values later. For example, if you wrote code like this:

```TypeScript
const obj = { counter: 0 };
if (someCondition) {
  obj.counter = 1;
}
```

TypeScript doesn’t assume the assignment of `1` to a field which previously had `0` is an error. Another way of saying this is that `obj.counter` must have the type `number`, not `0`, because types are used to determine both *reading* and *writing* behavior.

The same applies to strings:

```TypeScript
declare function handleRequest(url: string, method: 'GET' | 'POST'): void;

const req = { url: 'https://example.com', method: 'GET' };
handleRequest(req.url, req.method);
// Argument of type 'string' is not assignable to parameter of type '"GET" | "POST"'.
```

In the above example `req.method` is inferred to be `string`, not `"GET"`. Because code can be evaluated between the creation of `req` and the call of `handleRequest` which could assign a new string like `"GUESS"` to `req.method`, TypeScript considers this code to have an error.

There are two ways to work around this.

1. You can change the inference by adding a type assertion in either location:

```TypeScript
// Change 1:
const req = { url: 'https://example.com', method: 'GET' as 'GET' };
// Change 2
handleRequest(req.url, req.method as 'GET');
```

Change 1 means “I intend for `req.method` to always have the *literal type* `"GET"`”, preventing the possible assignment of `"GUESS"` to that field after. Change 2 means “I know for other reasons that `req.method` has the value `"GET"`“.

1. You can use `as const` to convert the entire object to be type literals:

```TypeScript
const req = { url: 'https://example.com', method: 'GET' } as const;
handleRequest(req.url, req.method);
```

The `as const` suffix acts like `const` but for the type system, ensuring that all properties are assigned the literal type instead of a more general version like `string` or `number`.

## Type Aliases

We’ve been using object types and union types by writing them directly in type annotations. This is convenient, but it’s common to want to use the same type more than once and refer to it by a single name.

A *type alias* is exactly that - a *name* for any *type*. The syntax for a type alias is:

```TypeScript
type Point = {
  x: number;
  y: number;
};

function printCoord(pt: Point) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}

printCoord({ x: 100, y: 100 });
```

You can actually use a type alias to give a name to any type at all, not just an object type. For example, a type alias can name a union type:

```TypeScript
type ID = number | string;
```

> [!WARNING] Aliases are *only* aliases - you cannot use type aliases to create different/distinct “versions” of the same type. When you use the alias, it’s exactly as if you had written the aliased type. In other words, this code might *look* illegal, but is OK according to TypeScript because both types are aliases for the same type:

```TypeScript
type UserInputSanitizedString = string;

function sanitizeInput(str: string): UserInputSanitizedString {
  return sanitize(str);
}

// Create a sanitized input
let userInput = sanitizeInput(getInput());

// Can still be re-assigned with a string though
userInput = 'new input';
```

## Functions

Functions are the primary means of passing data around in JavaScript. TypeScript allows you to specify the types of both the input and output values of functions.

**Parameter Type Annotations**

When you declare a function, you can add type annotations after each parameter to declare what types of parameters the function accepts. Parameter type annotations go after the parameter name:

```TypeScript
// Parameter type annotation
function greet(name: string) {
  console.log('Hello, ' + name.toUpperCase() + '!!');
}
```

When a parameter has a type annotation, arguments to that function will be checked:

```TypeScript
// Would be a runtime error if executed!
greet(42);
// Argument of type 'number' is not assignable to parameter of type 'string'.
```

> [!NOTE] Even if you don’t have type annotations on your parameters, TypeScript will still check that you passed the right number of arguments.

**Return Type Annotations**

You can also add return type annotations. Return type annotations appear after the parameter list:

```TypeScript
function getFavoriteNumber(): number {
  return 26;
}
```

Much like variable type annotations, you usually don’t need a return type annotation because TypeScript will infer the function’s return type based on its `return` statements. The type annotation in the above example doesn’t change anything. Some codebases will explicitly specify a return type for documentation purposes, to prevent accidental changes, or just for personal preference.

**Functions Which Return Promises**

If you want to annotate the return type of a function which returns a promise, you should use the `Promise` type:

```TypeScript
async function getFavoriteNumber(): Promise<number> {
  return 26;
}
```

**Anonymous Functions**

Anonymous functions are a little bit different from function declarations. When a function appears in a place where TypeScript can determine how it’s going to be called, the parameters of that function are automatically given types.

Here’s an example:

```TypeScript
const names = ['Alice', 'Bob', 'Eve'];

// Contextual typing for function - parameter s inferred to have type string
names.forEach(function (s) {
  console.log(s.toUpperCase());
});

// Contextual typing also applies to arrow functions
names.forEach((s) => {
  console.log(s.toUpperCase());
});
```

Even though the parameter `s` didn’t have a type annotation, TypeScript used the types of the `forEach` function, along with the inferred type of the array, to determine the type `s` will have.

This process is called *contextual typing* because the *context* that the function occurred within informs what type it should have.

Similar to the inference rules, you don’t need to explicitly learn how this happens, but understanding that it *does* happen can help you notice when type annotations aren’t needed. Later, we’ll see more examples of how the context that a value occurs in can affect its type.

**`void` Types**

`void` represents the return value of functions which don’t return a value. It’s the inferred type any time a function doesn’t have any `return` statements, or doesn’t return any explicit value from those return statements:

```TypeScript
// The inferred return type is void
function noop() {
  return;
}
```

In JavaScript, a function that doesn’t return any value will implicitly return the value `undefined`. However, `void` and `undefined` are not the same thing in TypeScript.

> [!NOTE] > `void` is not the same as `undefined` for TypeScript.

Annotated return type void:

```TypeScript
function printResult(num: number): void {
  console.log('Result: ' + num);
}
```

> [!IMPORTANT] A function that returns `void` will return `undefined` when compiled to JavaScript. `undefined` cannot be assigned as a return type of a function. Since (TypeScript < 5.0.0). `undefined` is an accepted type to be assigned to a variable.

```TypeScript
console.log(printResult(1)) // Undefined

// A function whose declared type is neither 'void' nor 'any' must return a value
function printResult(num: number): undefined {
	...
}

// Its a legal type assignment
let someValue: undefined;
```

**Functions as Types**

We can declare a variable with a type `function`:

```TypeScript
// Creates a variable with the type of function
let addValues: Function;

function add(n1: number, n1: number) {
  return n1 + n2;
}

addValues = add;

console.log(addValues(5, 2));
```

It would be nicer to specify how a function should look like, so we can define the correct syntax for the function type (e.g. arguments, return type, etc.)

The simplest way to describe a function is with a function type expression. These types are syntactically similar to arrow functions:

```TypeScript
// Create a function using function type expression
let combineValues: (a: number, b: number) => number;
// TypeScript will complaint the function types are different
combineValues = printResult;

// To fix this, assign the proper function type
combineValues = sum;
console.log(combineValues(8, 8));
```

> [!NOTE] It is important to mention that the difference of a function type expression and an arrow function declaration is that, instead of a code block, delimited by curly bracers, `() => { }` we need to specify the function return type `() => void` .

Function types expressions can also be used in callback functions:

```TypeScript
function greeter(fn: (a: string) => void) {
  fn("Hello, World");
}

function printToConsole(s: string) {
  console.log(s);
}

greeter(printToConsole);
```

The syntax (a: string) => void means “a function with one parameter, named a, of type string, that doesn’t have a return value”. Just like with function declarations, if a parameter type isn’t specified, it’s implicitly any.

> [!NOTE] The parameter name is required. The function type `(string) => void` means “a function with a parameter named string of type any“!

## The `unknown` Type

The `unknown` type represents any value. This is similar to the any type, but is safer because it’s not legal to do anything with an unknown value:

```TypeScript
function f1(a: any) {
  a.b(); // OK
}
function f2(a: unknown) {
  a.b();
// 'a' is of type 'unknown'.
}
```

Another example, if you are defining a variable which its value will be assigned by user input, and generally speaking, you can't determine its type, you can declare it as of type unknown.

It's legal to assign values to the variable, but you will get an error when you try to assign an unknown type variable to another typed variable, i.e. a string.

```TypeScript
let userInput: unknown;

// Legal assignment
userInput = 5;
userInput = 'Max';

// Illegal assignment
userName = userInput;
```

The advantage of this is to prevent a value that you can't predict its type to be passed somewhere else, which may cause an error.

To safely assign a string type value to an unknown type variable, add a type check.

```TypeScript
if (typeof userInput === 'string') {
  userName = userInput;
}
```

> [!TIP]
> `unknown` is better than `any` type because it ensures that you know what you are doing. 

## The `never` Type

Some functions *never* return a value:

```TypeScript
function fail(msg: string): never {
  throw new Error(msg);
}
```

The `never`type represents values which are never observed. In a return type, this means that the function throws an exception or terminates execution of the program.

`never also appears when TypeScript determines there's nothing left in a union.

```TypeScript
function fn(x: string | number) {
  if (typeof x === "string") {
    // do something
  } else if { (typeof x === "number")} {
    // do something else
  } else {
    x; // has type 'never'
  }
}

```

---

[[<< Previous]](../Chapter-01/README.md) [[^Top]](#chapter-2-typescript-basics-and-types) [[Next >>]](../Chapter-03/README.md)
